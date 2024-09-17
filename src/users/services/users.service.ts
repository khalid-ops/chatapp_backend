import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { loginUserDto } from '../dtos/user-login-dto';
import { UserContactService } from './user-contact.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private userContactService: UserContactService,
  ) {}

  async create(dto: CreateUserDto) {
    console.log('reached backend', dto);
    const created = this.repo.create(dto);
    const savedUser = await this.repo.save(created);
    return savedUser;
  }

  async loginUser(dto: loginUserDto) {
    const user = await this.repo.findOne({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (user.password === dto.password) {
      return user;
    } else {
      throw new UnauthorizedException('Incorrect user password');
    }
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

  async findOneByEmail(email: string) {
    return this.repo.findOne({
      where: {
        email: email,
      },
    });
  }

  async addUserContact(userId: string, contactId: string) {
    const user = await this.repo.findOne({
      where: {
        id: userId,
      },
    });
    const contact = await this.repo.findOne({
      where: {
        id: contactId,
      },
    });

    if (!user) {
      throw new NotFoundException('user not found');
    }
    if (!contact) {
      throw new NotFoundException('contact not found');
    }

    return this.userContactService.create({
      user: user,
      contact: contact,
    });
  }

  async fetchUserContacts(userId: string) {
    const results = await this.userContactService.fetchUserContacts(userId);
    return results.map((result) => result.contact);
  }
}
