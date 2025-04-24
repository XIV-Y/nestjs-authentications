import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class BasicAuthGuard extends AuthGuard('basic') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info, context) {
    if (err || !user) {
      // 401レスポンスと共にWWW-Authenticateヘッダーを明示的に設定
      const response = context.switchToHttp().getResponse();

      response.setHeader('WWW-Authenticate', 'Basic');

      throw new UnauthorizedException();
    }

    return user;
  }
}
