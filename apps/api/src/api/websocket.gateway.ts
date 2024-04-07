import { PlayerService } from './services/player.service';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from './services/auth.service';
import { UnauthorizedException, OnModuleInit } from '@nestjs/common';

@WebSocketGateway({ cors: true })
export class MyWebSocketGateway {
  constructor(
    private authService: AuthService,
    private playerService: PlayerService
  ) {}
  @WebSocketServer() server: Server;

  async afterInit(server: Server) {
    console.log('WebSocket gateway initialized');

    server.use(async (client, next) => {
      const token = client.handshake.auth.token.split('Bearer ').pop();
      try {
        const payload = await this.authService.decodeAndVerifyToken(token);
        console.log({ payload });

        if (payload.sub === client.id) {
          const user = await this.playerService.findOne(payload.sub);
          if (user) return next();
        }
      } catch (error) {
        if (error instanceof UnauthorizedException) {
          console.error('Unauthorized:', error.message);
        }
        return client.disconnect();
      }
      client.disconnect();
    });
  }

  async handleConnection(client: Socket) {
    // Handle WebSocket connection
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    // Handle WebSocket disconnection
    console.log('Client disconnected:', client.id);
  }

  // Add more WebSocket event handlers as needed
}
