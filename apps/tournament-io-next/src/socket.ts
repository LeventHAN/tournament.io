'use client';

import { io } from 'socket.io-client';
import { getAuthToken } from '../utils/helpers';

export const socket = io('http://localhost:3000', {
  transports: ['websocket', 'polling'],
  autoConnect: false,
  auth: async (cb) => {
    const token = await getAuthToken();
    cb({ token });
  },
});
