import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway({ cors: true })
export class ChatsGateway {
  @SubscribeMessage('chat-message')
  handleMessage(@MessageBody() payload: string): string {
    console.log(payload);
    return payload;
  }
}
