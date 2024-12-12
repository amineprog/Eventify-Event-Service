import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Event extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  date: Date;

  @Prop()
  location: string;

  @Prop()
  description: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
