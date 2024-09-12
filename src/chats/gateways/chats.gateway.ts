import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway(80, { namespace: 'chats' })
export class ChatsGateway {
  constructor() {}

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string): string {
    return data;
  }
}
