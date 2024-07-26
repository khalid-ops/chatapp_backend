import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/create-user-dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.service.create(dto);
  }

  @Post('/google-login')
  async createGoogleUsers(@Body() dto: CreateUserDto) {
    return this.service.createGoogleUserLogin(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers() {
    return this.service.list();
  }
}
