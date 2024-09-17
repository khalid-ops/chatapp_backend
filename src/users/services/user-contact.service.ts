import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserContact } from '../entities/user-contact.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserContactService {
  constructor(
    @InjectRepository(UserContact) private repo: Repository<UserContact>,
  ) {}

  async create(dto: Partial<UserContact>) {
    const created = this.repo.create(dto);
    const savedUser = await this.repo.save(created);
    return savedUser;
  }

  async fetchUserContacts(id: string) {
    return this.repo.find({
      where: {
        user: { id: id },
      },
      relations: {
        contact: true,
        user: true,
      },
    });
  }
}
