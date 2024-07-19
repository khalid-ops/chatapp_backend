import { Injectable } from '@nestjs/common';
import { User } from '../entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user-dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(dto: CreateUserDto) {
    console.log('reached backend');
    const created = this.repo.create(dto);
    const savedUser = await this.repo.save(created);
    return savedUser;
  }

  async createGoogleUserLogin(dto: CreateUserDto) {
    const user = await this.repo.findOne({
      where: {
        googleId: dto.googleId,
      },
    });
    let loggingUser = null;
    if (!user) {
      loggingUser = await this.create(dto);
    } else {
      loggingUser = user;
    }
    loggingUser.loggedIn = true;
    return this.repo.save(loggingUser);
  }

  list() {
    return this.repo.find();
  }
}
