import { BadRequestException, Injectable } from '@nestjs/common';
import { PaymentStatus, PaymentType, WorkshopStatus } from '@shared/constants';
import { WorkshopRepository } from '../repositories';
import { SubscriptionService } from 'src/modules/subscription/services';
import { ICreateWorkshop, IListWorkshops } from '../interfaces';
import { S3Service } from '@shared/services';
import { Types } from 'mongoose';
import { PaymentService } from 'src/modules/payment';

@Injectable()
export class WorkshopService {
  constructor(
    private readonly workshopRepository: WorkshopRepository,
    private readonly subscriptionService: SubscriptionService,
    private readonly paymentService: PaymentService,
    private s3: S3Service,
  ) {}

  async createWorkshop(payload: ICreateWorkshop) {
    const {
      planId,
      transactionId,
      paymentOption,
      userId,
      media,
      ...restPayload
    } = payload;
    let workshop;

    try {
      // Concurrent upload
      const uploadedMediaPromises = media.map(async (file) => {
        const fileUri = `workshops/${userId}/{uuid}`;
        const uploadedFile = await this.s3.uploadFile(file, fileUri);
        return uploadedFile.url;
      });

      // Wait for all media uploads to complete
      const uploadedMedia = await Promise.all(uploadedMediaPromises);
      workshop = await this.workshopRepository.create({
        ...restPayload,
        remainingSeats: restPayload?.maxPeople,
        createdBy: userId,
        media: uploadedMedia,
      });
      await this.subscriptionService.createSubscription({
        userId,
        planId,
        transactionId,
        paymentOption,
        paymentType: PaymentType.WORKSHOP_FEE,
        workshopId: workshop?._id?.toString(),
      });
      return workshop;
    } catch (error) {
      if (workshop) {
        await Promise.all(
          (workshop?.media || []).map((url) =>
            this.s3
              .deleteFile(url)
              .catch((err) => console.error('Error deleting media:', err)),
          ),
        );
        await this.workshopRepository.findOneAndDelete(
          { _id: workshop?._id },
          { notFoundThrowError: false },
        );
      }
      throw error;
    }
  }

  async updateWorkshop(payload: {
    workshopId: string;
    workshopStatus: string;
  }) {
    try {
      const { workshopId, workshopStatus } = payload;
      const workshop = await this.workshopRepository.findOneAndUpdate(
        { _id: workshopId },
        { $set: { status: workshopStatus } },
      );
      delete workshop?.tickets;
      return workshop;
    } catch (error) {
      throw error;
    }
  }

  async getWorkshop(payload: { workshopId: string }) {
    try {
      const { workshopId } = payload;
      return await this.workshopRepository.findOne(
        { _id: workshopId },
        { tickets: 0 },
      );
    } catch (error) {
      throw error;
    }
  }

  async listWorkshops(payload: IListWorkshops) {
    try {
      const { userId, limit, offset } = payload;
      return await this.workshopRepository.paginate({
        filterQuery: {
          ...(userId && { createdBy: new Types.ObjectId(userId) }),
          status: WorkshopStatus.OPEN,
          isApproved: true,
        },
        limit,
        offset,
        projection: { tickets: 0 },
      });
    } catch (error) {
      throw error;
    }
  }

  // async deleteWorkshop(payload: { workshopId: string }) {
  //   try {
  //     const { workshopId } = payload;
  //     return await this.workshopRepository.findOneAndDelete({
  //       _id: workshopId,
  //     });
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async purchaseTicket(payload: {
    workshopId: string;
    transactionId: string;
    paymentOption: string;
    quantity: number;
    customerId: string;
  }) {
    try {
      const { workshopId, transactionId, paymentOption, quantity, customerId } =
        payload;
      const [workshop, paymentDetail] = await Promise.all([
        this.workshopRepository.findOne({ _id: workshopId }),
        this.paymentService.fetchPayment(transactionId),
      ]);
      const { pricePerPerson, maxPeople, remainingSeats } = workshop;

      const { status, amount: paidAmount, metadata } = paymentDetail;
      if (status !== 'paid') throw new BadRequestException('Fee not paid');
      if (paidAmount / 100 != quantity * pricePerPerson)
        throw new BadRequestException('Fee not fully paid');
      if (metadata?.userId != customerId)
        throw new BadRequestException('Unverified Payment');
      if (remainingSeats + quantity > maxPeople)
        throw new BadRequestException('Seats Full');

      const payment = await this.paymentService.createPayment({
        userId: customerId,
        amount: paidAmount,
        paymentOption,
        paymentType: PaymentType.WORKSHOP_TICKET,
        paymentStatus: PaymentStatus.SUCCESS,
        transactionId,
        paymentDate: new Date(),
      });

      await this.workshopRepository.findOneAndUpdate(
        {
          _id: workshopId,
        },
        {
          $push: {
            tickets: {
              customerId,
              quantity,
              paymentId: payment?._id,
            },
          },
        },
      );
      return null;
    } catch (error) {
      throw error;
    }
  }
}
