import { SchemaFactory, Prop, Schema } from '@nestjs/mongoose';
import { AbstractSchema } from '@shared/abstracts';
import { WorkshopStatus } from '@shared/constants';
import { SchemaTypes, Types } from 'mongoose';

@Schema({
  _id: false,
  versionKey: false,
  timestamps: false,
})
class WorkshopLocation extends AbstractSchema<string> {
  // @Prop({ type: String, required: true })
  // address: string;

  @Prop({ type: String, required: true })
  longitude: string;

  @Prop({ type: String, required: true })
  latitude: string;
}

export const WorkshopLocationSchema =
  SchemaFactory.createForClass(WorkshopLocation);

@Schema({
  collection: 'workshops',
  versionKey: false,
  timestamps: true,
})
export class Workshop extends AbstractSchema<string> {
  @Prop({ type: String, required: true })
  workshopName: string;

  @Prop({ type: String, required: true })
  city: string;

  @Prop({ type: Date, required: true })
  startDate: string;

  @Prop({ type: Date, required: true })
  endDate: string;

  @Prop({ type: String, required: true })
  startTime: string;

  @Prop({ type: String, required: true })
  endTime: string;

  @Prop({ type: String, required: true })
  pricePerPerson: string;

  @Prop({ type: Number, required: true })
  maxPeople: number;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: WorkshopLocationSchema, required: true })
  location: WorkshopLocation;

  @Prop({ type: [{ type: String }], required: true })
  media: string[];

  @Prop({
    type: String,
    required: true,
    enum: WorkshopStatus,
    default: WorkshopStatus.CLOSED,
  })
  status?: string;

  @Prop({ type: Boolean, required: false, default: false })
  isApproved?: boolean;

  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'users' })
  createdBy: string;
}

export const WorkshopSchema = SchemaFactory.createForClass(Workshop);
