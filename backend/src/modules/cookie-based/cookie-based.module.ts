import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CookieBasedService } from './cookie-based.service';
import { UsersModule } from '../users/users.module';
import { CookieBasedController } from './cookie-based.controller';
import { CookieBasedStrategy } from './cookie-based.strategy';
import { CookieBasedSerializer } from './cookie-based.serializer';

@Module({
  imports: [UsersModule, PassportModule.register({ session: true })],
  providers: [CookieBasedService, CookieBasedStrategy, CookieBasedSerializer],
  controllers: [CookieBasedController],
  exports: [CookieBasedService],
})
export class CookieBasedModule {}
