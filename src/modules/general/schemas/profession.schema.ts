import { SchemaFactory, Prop, Schema } from '@nestjs/mongoose';
import { AbstractSchema } from '@shared/abstracts';

@Schema({
  collection: 'professions',
  versionKey: false,
  timestamps: true,
})
export class Profession extends AbstractSchema<string> {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  img: string;

  @Prop({ type: String, required: true, default: 'ACTIVE' })
  status?: string;
}

export const ProfessionSchema = SchemaFactory.createForClass(Profession);
