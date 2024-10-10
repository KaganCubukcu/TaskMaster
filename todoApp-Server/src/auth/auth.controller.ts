import {Controller, Post, Body, UnauthorizedException, BadRequestException, InternalServerErrorException} from '@nestjs/common'
import {AuthService} from './auth.service'
import {LoginDto} from './DTOs/login.dto'
import {RegisterDto} from './DTOs/register.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password)
    if (!user) {
      throw new UnauthorizedException()
    }
    return await this.authService.login(user)
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      return await this.authService.register(registerDto)
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('Email already exists')
      }
      throw new InternalServerErrorException(`Registeration Failed: ${error.message}`)
    }
  }
}
