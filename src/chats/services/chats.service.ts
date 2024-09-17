import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '../entities/messages.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Message) private repo: Repository<Message>,
    private dataSource: DataSource,
  ) {}

  async saveOneToOneChat(payload: any) {}
}
