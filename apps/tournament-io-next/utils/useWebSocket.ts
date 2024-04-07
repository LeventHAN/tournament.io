import { useEffect, useRef } from 'react';
import WebSocketSingleton from './websocket';
import { Socket } from 'socket.io-client';

const useWebSocket = (): Socket | null => {
  const webSocketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const webSocketSingleton = WebSocketSingleton.getInstance();

    webSocketSingleton.connect().then((webSocket) => {
      if (!webSocketRef.current) {
        webSocketRef.current = webSocket;
      }
    });

    return () => {
      // Don't close the WebSocket connection here, let it be managed by the WebSocket singleton
    };
  }, []);

  return webSocketRef.current;
};

export default useWebSocket;
