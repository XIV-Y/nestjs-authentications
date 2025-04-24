import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

interface TokenData {
  token: string;
  userId: number;
  username: string;
  expiresAt: Date;
}

@Injectable()
export class TokenService {
  private readonly tokens: Map<string, TokenData> = new Map();

  constructor(private usersService: UsersService) {}

  async validateUserAndGenerateToken(
    username: string,
    password: string,
  ): Promise<TokenData | null> {
    const user = await this.usersService.findOne(username);

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return this.generateToken(user.userId, user.username);
  }

  generateToken(userId: number, username: string): TokenData {
    const tokenValue = crypto.randomBytes(32).toString('hex');

    const expiresAt = new Date();

    // トークンの有効期限を1時間後に設定
    expiresAt.setHours(expiresAt.getHours() + 1);

    const tokenData: TokenData = {
      token: tokenValue,
      userId,
      username,
      expiresAt,
    };

    // トークンをメモリ内に保存
    this.tokens.set(tokenValue, tokenData);

    return tokenData;
  }

  validateToken(token: string): TokenData | null {
    if (!this.tokens.has(token)) {
      return null;
    }

    const tokenData = this.tokens.get(token);

    if (new Date() > tokenData.expiresAt) {
      this.tokens.delete(token);

      return null;
    }

    return tokenData;
  }

  invalidateToken(token: string): boolean {
    return this.tokens.delete(token);
  }

  async getUserData(userId: number) {
    const user = await this.usersService.findById(userId);

    if (!user) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userData } = user;

    return userData;
  }
}
