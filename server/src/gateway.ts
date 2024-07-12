import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/core/environment';
import { ChatService } from './modules/chat/chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService,
  ) {}

  afterInit(server: Server) {
    console.log('WebSocket server initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    client: Socket,
    payload: { token: string; receiverId: string; message: string },
  ) {
    const { token, receiverId, message } = payload;
    console.log(payload);

    const decoded = this.jwtService.verify(token, { secret: JWT_SECRET });

    const newMessage = await this.chatService.sendMessage(
      decoded.userId,
      receiverId,
      message,
    );
    this.server.emit('receiveMessage', newMessage);
  }

  @SubscribeMessage('getChatHistory')
  async handleGetChatHistory(
    client: Socket,
    payload: { token: string; contactId: string },
  ) {
    const { token, contactId } = payload;
    const decoded = this.jwtService.verify(token, { secret: JWT_SECRET });

    const chatHistory = await this.chatService.getChatHistory(
      decoded.userId,
      contactId,
    );
    client.emit('chatHistory', chatHistory);
  }
}
