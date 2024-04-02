import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TournamentResolver } from './resolvers/tournament.resolver';
import { TournamentService } from './services/tournament.service';
import { PrismaService } from './prisma/prisma.service';
import { PlayerResolver } from './resolvers/player.resolver';
import { PlayerService } from './services/player.service';
import { AuthService } from './services/auth.service';
import { TournamentController } from './rest/tournament';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'apps/api/src/schema.gql'),
    }),
  ],
  providers: [
    TournamentResolver,
    TournamentService,
    PrismaService,
    PlayerResolver,
    PlayerService,
    AuthService,
  ],
  controllers: [TournamentController],
})
export class ApiModule {}
