import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { BasicAuthService } from './basic.service';
import { BasicAuthStrategy } from './basic.strategy';
import { BasicAuthController } from './basic.controller';
import { BasicAuthGuard } from './basic.guard';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PassportModule, UsersModule],
  providers: [BasicAuthService, BasicAuthStrategy, BasicAuthGuard],
  controllers: [BasicAuthController],
  exports: [BasicAuthService, BasicAuthGuard],
})
export class BasicAuthModule {}
