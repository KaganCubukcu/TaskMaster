import {Injectable} from '@nestjs/common'
import {JwtService} from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import {User} from './interfaces/user/User.interface'
import {LoginResult} from './interfaces/login/LoginResult.interface'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {RegisterDto} from './DTOs/register.dto'
import {Types} from 'mongoose'

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private userModel: Model<User>, private readonly jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.userModel.findOne({email}).exec()
    if (user && (await bcrypt.compare(password, user.password))) {
      const {password, ...result} = user.toObject()
      return result
    }
    return null
  }

  async login(user: Omit<User, 'password'>): Promise<LoginResult> {
    const payload = {email: user.email, sub: user._id}
    const userId = Types.ObjectId.isValid(user._id) ? (user._id as unknown as Types.ObjectId).toString() : user._id
    return {
      token: this.jwtService.sign(payload),
      userId
    }
  }

  async register(registerDto: RegisterDto): Promise<LoginResult> {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10)
    const createdUser = new this.userModel({
      ...registerDto,
      password: hashedPassword
    })
    const savedUser = await createdUser.save()
    const userId = Types.ObjectId.isValid(savedUser._id) ? (savedUser._id as unknown as Types.ObjectId).toString() : savedUser._id
    return {
      token: this.jwtService.sign({email: savedUser.email, sub: savedUser._id}),
      userId
    }
  }
}
