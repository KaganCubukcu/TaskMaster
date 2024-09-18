import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {Profile} from './models/profile.model'
import {UpdateProfileDto} from './DTOs/update-profile.dto'

@Injectable()
export class ProfileService {
  constructor(@InjectModel(Profile.name) private profileModel: Model<Profile>) {}

  async getProfile(userId: string): Promise<Profile> {
    return this.profileModel.findOne({_id: userId}).exec()
  }

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto): Promise<Profile> {
    return this.profileModel.findByIdAndUpdate(userId, updateProfileDto, {new: true}).exec()
  }
}
