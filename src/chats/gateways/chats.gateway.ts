import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway({ cors: true })
export class ChatsGateway {
  @SubscribeMessage('message')
  handleMessage(@MessageBody() payload: string): string {
    console.log(payload);
    return payload;
  }
}
