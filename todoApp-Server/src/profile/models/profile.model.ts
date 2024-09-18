import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose'
import {Document} from 'mongoose'

@Schema()
export class Profile extends Document {
  @Prop({required: true})
  email: string

  @Prop({required: true})
  name: string

  @Prop({required: true})
  userId: string

  @Prop({required: true})
  createdAt: Date

  @Prop({required: true})
  updatedAt: Date

  @Prop({required: false})
  profilePicture: string
}

export const ProfileSchema = SchemaFactory.createForClass(Profile)
