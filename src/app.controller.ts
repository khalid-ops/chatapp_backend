import { Controller, Request, Post, Res } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { Response } from 'express';
@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  async login(@Request() req: any, @Res() res: Response) {
    const response = await this.authService.login(req.body);
    res.cookie('accessToken', response.access_token, {
      expires: new Date(new Date().getTime() + 30 * 1000),
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });
    return res.status(200).send(response.user);
  }
}
