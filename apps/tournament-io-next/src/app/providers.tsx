'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { socket } from '../socket';
import { useAuth } from '@clerk/nextjs';

export function Providers({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState('N/A');

  const { userId, getToken } = useAuth();

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    async function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on('upgrade', (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport('N/A');
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    socket.connect();

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <div>
          <p>Status: {isConnected ? 'connected' : 'disconnected'}</p>
          <p>Transport: {transport}</p>
        </div>
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
