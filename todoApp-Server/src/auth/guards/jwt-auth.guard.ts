import {Injectable, ExecutionContext} from '@nestjs/common'
import {AuthGuard} from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    const {route} = request
    if (route.path === '/auth/login' || route.path === '/auth/register') {
      return true
    }
    return super.canActivate(context)
  }
}
