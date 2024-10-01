import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '../entities/messages.entity';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/users/entities/users.entity';
import { UserContact } from 'src/users/entities/user-contact.entity';
import { Conversation } from '../entities/conversation.entity';
import { MessageReceipt } from '../entities/message-receipt.entity';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Message) private repo: Repository<Message>,
    private dataSource: DataSource,
  ) {}

  async canCommunicate(senderId: string, recieverId: string): Promise<boolean> {
    const contact = await this.dataSource.manager.findOne(UserContact, {
      where: [
        {
          user: { id: senderId },
          contact: { id: recieverId },
          status: 'accepted',
        },
      ],
    });

    return !!contact;
  }

  async saveOneToOneChat(payload: {
    senderId: string;
    recieverId: string;
    message: string;
  }) {
    const { senderId, recieverId, message } = payload;
    const canCommunicate = await this.canCommunicate(senderId, recieverId);
    if (!canCommunicate) {
      throw new ForbiddenException(
        'You are not allowed to send messages to this user.',
      );
    }

    let conversation = await this.dataSource.manager.findOne(Conversation, {
      where: [
        {
          participants: [
            { user: { id: senderId } },
            { user: { id: recieverId } },
          ],
        },
        {
          participants: [
            { user: { id: recieverId } },
            { user: { id: senderId } },
          ],
        },
      ],
      relations: ['participants'],
    });

    if (!conversation) {
      conversation = this.dataSource.manager.create(Conversation, {
        type: 'private',
        participants: [
          { user: { id: senderId } },
          { user: { id: recieverId } },
        ],
      });
      await this.dataSource.manager.save(conversation);
    }

    const createdMessage = this.dataSource.manager.create(Message, {
      conversation,
      sender: { id: senderId } as User,
      content: message,
    });
    const savedMessage = await this.dataSource.manager.save(createdMessage);

    const receipt = this.dataSource.manager.create(MessageReceipt, {
      message: savedMessage,
      recipient: { id: recieverId } as User,
      status: 'delivered',
    });
    await this.dataSource.manager.save(receipt);

    return savedMessage;
  }
}
