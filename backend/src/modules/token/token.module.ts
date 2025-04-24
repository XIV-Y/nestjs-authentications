import { forwardRef, Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { UsersModule } from '@/src/modules/users/users.module';
import { TokenGuard } from './token.guard';

@Module({
  imports: [forwardRef(() => UsersModule)],
  providers: [TokenService, TokenGuard],
  controllers: [TokenController],
  exports: [TokenService, TokenGuard],
})
export class TokenModule {}
