import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class CookieBasedSerializer extends PassportSerializer {
  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    done(null, { userId: user.userId, username: user.username });
  }

  deserializeUser(payload: any, done: (err: Error, payload: any) => void): any {
    done(null, payload);
  }
}
