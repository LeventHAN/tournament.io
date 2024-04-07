/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ApiModule } from './api/api.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);

  app.useWebSocketAdapter(new IoAdapter(app));

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  });

  // Set global prefix
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // Start listening on the specified port
  const port = process.env.PORT || 3000;
  await app.listen(port);

  // Log server URL
  Logger.log(
    `🚀 Application GraphQL is running on: http://localhost:${port}/graphql`
  );
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );

  // Log WebSocket server URL
  Logger.log(`🚀 WebSocket server is running on: ws://localhost:${port}`);

  // Add WebSocket handlers and events here if needed
}

bootstrap();
