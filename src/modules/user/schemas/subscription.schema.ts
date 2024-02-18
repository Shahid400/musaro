import { SchemaFactory, Prop, Schema } from '@nestjs/mongoose';
import { AbstractSchema } from '@shared/abstracts';
import {
  PaymentOption,
  SubscriptionPlan,
  SubscriptionStatus,
} from '@shared/constants';
import { SchemaTypes } from 'mongoose';

@Schema({
  collection: 'payments',
  versionKey: false,
  timestamps: true,
})
export class Subscription extends AbstractSchema<string> {
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'users' })
  userId: string; // User ID who initiated the payment

  @Prop({ type: String, required: true, enum: SubscriptionPlan })
  plan: string; // Subscription plan (e.g., monthly, yearly)

  @Prop({ type: Number, required: true })
  amount: number; // Amount of subscription

  @Prop({ type: String, required: true })
  paymentId: string; // Payment ID associated with the subscription

  @Prop({ type: String, required: true })
  startDate: Date; // Start date of the subscription

  @Prop({ type: Date, required: true })
  endDate: Date; // End date of the subscription

  @Prop({
    type: String,
    required: true,
    enum: SubscriptionStatus,
    default: SubscriptionStatus.INACTIVE,
  })
  status: string; // Subscription status (e.g., active, inactive)

  //   @Prop({ type: String, required: true })
  //   metadata: any; // Additional metadata related to the subscription
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
