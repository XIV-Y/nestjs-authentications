import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class CookieBasedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    console.log('Session:', request.session);
    console.log('IsAuthenticated:', request.isAuthenticated());
    console.log('User in request:', request.user);

    return request.isAuthenticated();
  }
}
