import { BasicStrategy as Strategy } from 'passport-http';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BasicAuthService } from './basic.service';

@Injectable()
export class BasicAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private basicAuthService: BasicAuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.basicAuthService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
