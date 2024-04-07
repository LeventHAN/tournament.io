import { io, Socket } from 'socket.io-client';
import { getAuthToken, getUserId } from './helpers';

class WebSocketSingleton {
  private static instance: WebSocketSingleton;
  private socket: Socket | null;

  private constructor() {
    this.socket = null;
  }

  public static getInstance(): WebSocketSingleton {
    if (!WebSocketSingleton.instance) {
      WebSocketSingleton.instance = new WebSocketSingleton();
    }
    return WebSocketSingleton.instance;
  }

  public async connect(): Promise<Socket> {
    console.log('Connecting to WebSocket server');
    if (!this.socket) {
      console.log('Creating new WebSocket connection');
      const accessToken = await getAuthToken();
      const userId = await getUserId();
      this.socket = io('http://localhost:3000', {
        transports: ['websocket', 'polling'],
        auth: {
          token: accessToken,
        },
      });
      if (userId) this.socket.io.engine.id = userId;
    }
    return this.socket;
  }
}

export default WebSocketSingleton;
