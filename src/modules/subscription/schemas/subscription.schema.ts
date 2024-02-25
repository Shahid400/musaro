import { SchemaFactory, Prop, Schema } from '@nestjs/mongoose';
import { AbstractSchema } from '@shared/abstracts';
import { SubscriptionType, SubscriptionStatus } from '@shared/constants';
import { SchemaTypes } from 'mongoose';

@Schema({
  collection: 'subscriptions',
  versionKey: false,
  timestamps: true,
})
export class Subscription extends AbstractSchema<string> {
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'users' })
  userId: string; // User ID who subscribed

  @Prop({ type: String, required: true })
  planId: string;

  // @Prop({ type: String, required: true, enum: SubscriptionType })
  // plan: string;

  // @Prop({ type: Number, required: true })
  // amount: number;

  @Prop({ type: String, required: true })
  paymentId: string;

  @Prop({ type: Date, required: true })
  startDate: Date;

  @Prop({ type: Date, required: true })
  endDate: Date;

  @Prop({
    type: String,
    required: true,
    enum: SubscriptionStatus,
    default: SubscriptionStatus.INACTIVE,
  })
  status?: string;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
