import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';

import { TokenService } from './token.service';
import { TokenGuard } from './token.guard';
import { Request } from 'express';

@Controller('token-auth')
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() credentials: { username: string; password: string }) {
    const tokenData = await this.tokenService.validateUserAndGenerateToken(
      credentials.username,
      credentials.password,
    );

    if (!tokenData) {
      throw new UnauthorizedException('No valid credentials provided');
    }

    return {
      access_token: tokenData.token,
      expires_at: tokenData.expiresAt,
      user: {
        userId: tokenData.userId,
        username: tokenData.username,
      },
    };
  }

  @UseGuards(TokenGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request) {
    const success = this.tokenService.invalidateToken(req.token);

    if (!success) {
      throw new UnauthorizedException('Invalid token');
    }

    return {
      message: 'Logged out successfully',
    };
  }

  @UseGuards(TokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Req() req: Request) {
    // 古いトークンを無効化
    this.tokenService.invalidateToken(req.token);

    // 新しいトークンを生成
    const user = req.user;
    const newTokenData = this.tokenService.generateToken(
      user.userId,
      user.username,
    );

    return {
      access_token: newTokenData.token,
      expires_at: newTokenData.expiresAt,
      user: {
        userId: user.userId,
        username: user.username,
      },
    };
  }
}
