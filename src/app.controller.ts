import { Controller, Request, Post, Response } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  async login(@Request() req: any, @Response() res: any) {
    const response = await this.authService.login(req.body);
    res.cookie('accessToken', response.access_token, {
      expires: new Date(new Date().getTime() + 30 * 1000),
      sameSite: 'None',
      httpOnly: true,
      secure: true,
      maxAge: 900000,
    });
    return res.status(200).send(response.user);
  }
}
