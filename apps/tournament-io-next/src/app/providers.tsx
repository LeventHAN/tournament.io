'use client';

import { NextUIProvider } from '@nextui-org/react';
import {} from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { WebSocketProvider } from '@/components/WebSocketContext';
import useWebSocket from '@/utils/useWebSocket';

export function Providers({ children }: { children: React.ReactNode }) {
  const webSocket = useWebSocket();

  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <WebSocketProvider webSocket={webSocket}>{children}</WebSocketProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
