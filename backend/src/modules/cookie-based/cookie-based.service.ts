import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';

import { UsersService } from '@/src/modules/users/users.service';

@Injectable()
export class CookieBasedService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.findOne(username);

      if (!user) {
        return null;
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (isValid) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;

        return result;
      }

      return null;
    } catch (e) {
      console.error('パスワード検証エラー:', e);

      return null;
    }
  }
}
