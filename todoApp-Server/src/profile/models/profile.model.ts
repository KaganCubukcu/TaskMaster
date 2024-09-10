import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Profile extends Document {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  name: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
