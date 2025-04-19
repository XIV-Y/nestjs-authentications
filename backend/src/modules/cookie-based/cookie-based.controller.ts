import { Controller, Post, UseGuards, Req, Res, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

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
        user: req.user,
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
}
