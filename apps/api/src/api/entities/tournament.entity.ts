import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Bracket } from './bracket.entity';
import { Player } from './player.entity';
import { Prisma } from '@prisma/client';
import graphqlTypeJson from 'graphql-type-json';

@ObjectType()
export class Tournament {
  @Field(() => String)
  id: string;

  @Field(() => String)
  tournamentName: string;

  @Field(() => graphqlTypeJson, { nullable: true })
  tournamentDescription: Prisma.InputJsonObject[];

  @Field(() => [Bracket])
  brackets: Bracket[];

  @Field(() => Int)
  currentTournamentBracket: number;

  @Field(() => [Player])
  tournamentParticipants?: Player[];

  @Field(() => String)
  createdAt: string;
  @Field(() => String)
  updatedAt: string;
}
