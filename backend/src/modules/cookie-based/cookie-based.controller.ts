import { Controller, Post, UseGuards, Req, Res, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { CookieBasedGuard } from './cookie-based.guard';

@Controller('cookie-based')
export class CookieBasedController {
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    req.session.user = req.user;

    req.login(req.user, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: 'Login failed', error: err.message });
      }

      console.log('Login successful, user:', req.user);
      console.log('Is authenticated:', req.isAuthenticated());

      return res.send({
        message: 'ログイン成功',
        user: {
          userId: req.user.userId,
          username: req.user.username,
        },
      });
    });
  }

  @Get('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    req.logout((err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: 'Logout failed', error: err.message });
      }

      req.session.destroy(() => {
        res.clearCookie('connect.sid');

        return res.send({
          message: 'ログアウト成功',
        });
      });
    });
  }

  @UseGuards(CookieBasedGuard)
  @Get('refresh-session')
  async refreshSession(@Req() req: Request, @Res() res: Response) {
    const user = req.user;

    const regenerateSession = () => {
      return new Promise<void>((resolve, reject) => {
        req.session.regenerate((err) => {
          if (err) {
            reject(err);
            return;
          }
          resolve();
        });
      });
    };

    try {
      await regenerateSession();

      req.session.user = user;

      req.login(req.user, (err) => {
        if (err) {
          return res
            .status(500)
            .json({ message: 'Login failed', error: err.message });
        }

        return res.send({
          message: 'セッション更新成功',
          user: {
            userId: user.userId,
            username: user.username,
          },
        });
      });
    } catch (error) {
      return res.status(500).send({
        message: 'セッション更新エラー',
        error: error.message,
      });
    }
  }
}
