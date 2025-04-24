import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import { TokenService } from './token.service';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.substring(7);
    const tokenData = this.tokenService.validateToken(token);

    if (!tokenData) {
      throw new UnauthorizedException('Invalid token');
    }

    request.user = await this.tokenService.getUserData(tokenData.userId);
    request.token = token;

    return true;
  }
}
