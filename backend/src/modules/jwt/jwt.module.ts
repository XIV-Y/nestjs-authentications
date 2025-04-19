import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersModule } from '@/src/modules/users/users.module';
import { JWTAuthController } from './jwt.controller';
import { JWTAuthService } from './jwt.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '3m' }, // トークンの有効期限（例: 60分）
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [JWTAuthService, JwtStrategy],
  controllers: [JWTAuthController],
  exports: [JWTAuthService],
})
export class AuthModule {}
