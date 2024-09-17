import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/create-user-dto';
// import { JwtAuthGuard } from 'src/auth/auth.guard';

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

  // @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers() {
    return this.service.list();
  }

  @Post('/contact')
  async createUserContact(@Body() dto: { userId: string; contactId: string }) {
    return this.service.addUserContact(dto.userId, dto.contactId);
  }

  @Get('/contacts/:id')
  async fetchUserContacts(@Param('id') id: string) {
    return this.service.fetchUserContacts(id);
  }
}
