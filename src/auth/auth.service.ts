import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const userFound = await this.validateUser(user.email, user.password);
    console.log(userFound);
    if (!userFound) {
      throw new UnauthorizedException('user not found!');
    }
    const payload = { email: userFound.email, sub: userFound.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: payload,
    };
  }
}
