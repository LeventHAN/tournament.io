import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class MyWebSocketGateway {
  @WebSocketServer() server: Server;

  async handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    // Handle WebSocket disconnection
    console.log('Client disconnected:', client.id);
  }
}
