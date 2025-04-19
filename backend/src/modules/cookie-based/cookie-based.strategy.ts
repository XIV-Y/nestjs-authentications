import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CookieBasedService } from './cookie-based.service';

@Injectable()
export class CookieBasedStrategy extends PassportStrategy(Strategy) {
  constructor(private cookieBasedService: CookieBasedService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.cookieBasedService.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
