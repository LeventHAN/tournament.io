import React, { createContext, useContext } from 'react';

const WebSocketContext = createContext<WebSocket | null>(null);

export const useWebSocketContext = () => useContext(WebSocketContext);

export const WebSocketProvider: React.FC<{ webSocket: WebSocket }> = ({
  webSocket,
  children,
}) => {
  return (
    <WebSocketContext.Provider value={webSocket}>
      {children}
    </WebSocketContext.Provider>
  );
};
