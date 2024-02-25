import { BadRequestException, Injectable } from '@nestjs/common';
import { SubscriptionPlanService } from './subscription-plan.service';
import { ConfigService } from '@nestjs/config';
import { PaymentService } from 'src/modules/payment';
import { SubscriptionRepository } from '../repositories';
import {
  PaymentStatus,
  PaymentType,
  SubscriptionStatus,
  SubscriptionType,
} from '@shared/constants';
import { UserRepository } from 'src/modules/user';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
    private readonly subscriptionPlanService: SubscriptionPlanService,
    private readonly paymentService: PaymentService,
    private readonly userRepository: UserRepository,
    private readonly config: ConfigService,
  ) {}

  private async getSubscriptionDates(period) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const endDate = new Date(today.getTime());

    const isLeapYear = new Date(today.getFullYear(), 1, 29).getDate() === 29;
    const daysToAdd =
      period === SubscriptionType.MONTHLY ? 29 : isLeapYear ? 365 : 364;

    endDate.setDate(endDate.getDate() + daysToAdd);
    endDate.setHours(23, 59, 59, 999);

    return { startDate: today, endDate: endDate };
  }

  async createSubscription(payload: any) {
    try {
      const { planId, transactionId, paymentOption } = payload;
      let { userId } = payload;
      userId = userId.toString();
      const [subscriptionPlan, paymentDetail] = await Promise.all([
        this.subscriptionPlanService.getSubscriptionPlan({ _id: planId }),
        this.paymentService.fetchPayment(transactionId),
      ]);

      const { plan, amount, discount } = subscriptionPlan;
      const total = discount > 0 ? amount - amount * (discount / 100) : amount;

      const { status, amount: paidAmount, metadata } = paymentDetail;

      if (status !== 'paid')
        throw new BadRequestException('Subscription Fee unpaid');
      if (paidAmount / 100 != total)
        throw new BadRequestException('Subscription Fee not fully paid');
      if (metadata?.userId != userId || metadata?.planId != planId)
        throw new BadRequestException('Unverified Payment');

      const paymentData = {
        userId,
        amount,
        paymentOption,
        paymentType: PaymentType.SUBSCRIPTION,
        paymentStatus: PaymentStatus.SUCCESS,
        transactionId,
        paymentDate: new Date(),
      };
      const payment = await this.paymentService.createPayment(paymentData);

      const { startDate, endDate } = await this.getSubscriptionDates(plan);

      const subscriptionData = {
        userId,
        planId,
        paymentId: payment?._id.toString(),
        startDate,
        endDate,
        status: SubscriptionStatus.ACTIVE,
      };
      const subscription =
        await this.subscriptionRepository.create(subscriptionData);
      await this.userRepository.findOneAndUpdate(
        { _id: userId },
        { $set: { 'metadata.isProfileCompleted': true } },
      );
      return subscription;
    } catch (error) {
      throw error;
    }
  }
}
