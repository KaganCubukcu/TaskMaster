import {Module} from '@nestjs/common'
import {PassportModule} from '@nestjs/passport'
import {JwtModule} from '@nestjs/jwt'
import {ConfigModule, ConfigService} from '@nestjs/config'
import {AuthService} from './auth.service'
import {AuthController} from './auth.controller'
import {JwtStrategy} from './jwt.strategy'
import {UserSchema} from './models/auth.model'
import {MongooseModule} from '@nestjs/mongoose'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {expiresIn: '1h'}
      }),
      inject: [ConfigService]
    }),
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}])
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
