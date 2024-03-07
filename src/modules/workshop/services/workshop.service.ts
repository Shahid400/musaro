import { Injectable } from '@nestjs/common';
import { PaymentType } from '@shared/constants';
import { WorkshopRepository } from '../repositories';
import { SubscriptionService } from 'src/modules/subscription/services';
import { ICreateWorkshop } from '../interfaces';

@Injectable()
export class WorkshopService {
  constructor(
    private readonly workshopRepository: WorkshopRepository,
    private readonly subscriptionService: SubscriptionService,
  ) {}

  async createWorkshop(payload: ICreateWorkshop) {
    const { planId, transactionId, paymentOption, userId, ...restPayload } =
      payload;

    try {
      const workshop = await this.workshopRepository.create({
        ...restPayload,
        createdBy: userId,
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
      throw error;
    }
  }
}
