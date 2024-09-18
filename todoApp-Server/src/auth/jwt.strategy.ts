import {ExtractJwt, Strategy} from 'passport-jwt'
import {PassportStrategy} from '@nestjs/passport'
import {Injectable} from '@nestjs/common'
import {JwtPayload} from './interfaces/jwt/JwtPayload.interface'
import {Types} from 'mongoose'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET
    })
  }

  async validate(payload: JwtPayload) {
    const userId = Types.ObjectId.isValid(payload.sub) ? (payload.sub as unknown as Types.ObjectId).toString() : payload.sub
    return {userId, email: payload.email}
  }
}
