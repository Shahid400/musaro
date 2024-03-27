import { Injectable } from '@nestjs/common';
import { PaymentType, WorkshopStatus } from '@shared/constants';
import { WorkshopRepository } from '../repositories';
import { SubscriptionService } from 'src/modules/subscription/services';
import { ICreateWorkshop, IListWorkshops } from '../interfaces';
import { S3Service } from '@shared/services';
import { Types } from 'mongoose';

@Injectable()
export class WorkshopService {
  constructor(
    private readonly workshopRepository: WorkshopRepository,
    private readonly subscriptionService: SubscriptionService,
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
      return await this.workshopRepository.findOneAndUpdate(
        { _id: workshopId },
        { $set: { status: workshopStatus } },
      );
    } catch (error) {
      throw error;
    }
  }

  async getWorkshop(payload: { workshopId: string }) {
    try {
      const { workshopId } = payload;
      return await this.workshopRepository.findOne({ _id: workshopId }, { tickets: 0 });
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

  // async purchaseWorkshopTicket(payload: { workshopId: string }) {
  //   try {
  //     const { workshopId } = payload;
  //     return await this.workshopRepository.findOneAndDelete({
  //       _id: workshopId,
  //     });
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
