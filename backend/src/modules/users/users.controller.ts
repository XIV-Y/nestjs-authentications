/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, UseGuards, Request } from '@nestjs/common';

import { JwtAuthGuard } from '@/src/modules/jwt/jwt.guard';
import { CookieBasedGuard } from '@/src/modules/cookie-based/cookie-based.guard';
import { TokenGuard } from '@/src/modules/token/token.guard';
import { BasicAuthGuard } from '@/src/modules//basic/basic.guard';

@Controller('users')
export class UsersController {
  // JWT認証を使用する場合
  // @UseGuards(JwtAuthGuard)

  // Cookie認証を使用する場合
  // @UseGuards(CookieBasedGuard)

  // Token認証を使用する場合
  // @UseGuards(TokenGuard)

  // Basic認証を使用する場合
  @UseGuards(BasicAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
