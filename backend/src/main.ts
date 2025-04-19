import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';
import * as csurf from 'csurf';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const sessionSecret = configService.get<string>('SESSION_SECRET');

  app.use(helmet());

  // Cookieパーサーの設定
  app.use(cookieParser());

  // セッションの設定
  app.use(
    session({
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // 本番環境ではHTTPSのみ
        maxAge: 1000 * 60 * 60, // 1時間
        sameSite: 'lax',
      },
    }),
  );

  // Passportの初期化
  app.use(passport.initialize());
  app.use(passport.session());

  // CSRFトークンの設定
  app.use(
    csurf({
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      },
    }),
  );

  await app.listen(3001);
}
bootstrap();
