import { Controller, Post, Body, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { JWTAuthService } from './jwt.service';

@Controller('jwt-auth')
export class JWTAuthController {
  constructor(private jwtAuthService: JWTAuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: { username: string; password: string }) {
    const user = await this.jwtAuthService.validateUser(
      loginDto.username,
      loginDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.jwtAuthService.login(user);
  }
}
