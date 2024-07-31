import { Controller, Request, Post } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  async login(@Request() req: any) {
    const response = await this.authService.login(req.body);
    return response;
  }
}
