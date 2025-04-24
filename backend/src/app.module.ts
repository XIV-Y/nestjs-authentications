import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '@/src/modules/jwt/jwt.module';
import { TokenModule } from '@/src/modules/token/token.module';
import { UsersModule } from '@/src/modules/users/users.module';
import { CookieBasedModule } from '@/src/modules/cookie-based/cookie-based.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    CookieBasedModule,
    TokenModule,
    UsersModule,
  ],
})
export class AppModule {}
