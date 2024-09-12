import { Module } from '@nestjs/common';
import { ChatsService } from './services/chats.service';
import { ChatsController } from './controllers/chats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from './entities/conversation.entity';
import { Message } from './entities/messages.entity';
import { ConversationParticipant } from './entities/conversation-participants.entity';
import { MessageReceipt } from './entities/message-receipt.entity';
import { ChatsGateway } from './gateways/chats.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Conversation,
      Message,
      ConversationParticipant,
      MessageReceipt,
    ]),
  ],
  controllers: [ChatsController],
  providers: [ChatsService, ChatsGateway],
})
export class ChatsModule {}
