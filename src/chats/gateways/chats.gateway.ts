import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { ChatsService } from '../services/chats.service';

@WebSocketGateway({ cors: true })
export class ChatsGateway {
  constructor(private chatsService: ChatsService) {}

  @SubscribeMessage('chat-message')
  async handleMessage(@MessageBody() payload: string) {
    console.log(payload);
    const response = await this.chatsService.saveOneToOneChat(payload);
    return response;
  }
}
