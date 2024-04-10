import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from './services/auth.service';

@WebSocketGateway({ cors: true })
export class MyWebSocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private readonly authService: AuthService;
  private readonly logger = new Logger(MyWebSocketGateway.name);

  afterInit(server: Server) {
    console.log('WebSocket server initialized');
  }

  async handleConnection(client: Socket) {
    console.log(client.handshake.headers.auth);
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    // Handle WebSocket disconnection
    console.log('Client disconnected:', client.id);
  }
}
