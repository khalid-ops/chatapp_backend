import {
  // ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatsService } from '../services/chats.service';

@WebSocketGateway({ cors: true })
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private chatsService: ChatsService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterInit(server: Server) {
    console.log('server initialized');
  }

  handleConnection(client: Socket) {
    console.log('client connected', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('client disconnected', client.id);
  }

  @SubscribeMessage('chat-message')
  async handleMessage(
    @MessageBody()
    payload: {
      message: string;
      senderId: string;
      recieverId: string;
    },
  ) {
    console.log(payload);
    const { message, senderId, recieverId } = payload;
    const saved = await this.chatsService.saveOneToOneChat({
      senderId,
      recieverId,
      message,
    });
    this.server.to(`user_${recieverId}`).emit('chat-message', saved);
    this.server.to(`user_${senderId}`).emit('chat-message', saved);
  }
}
