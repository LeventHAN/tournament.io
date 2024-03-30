import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Bracket } from './bracket.entity';

@ObjectType()
export class Tournament {
  @Field(() => String)
  id: string;

  @Field(() => String)
  tournamentName: string;

  @Field(() => [Bracket])
  brackets: Bracket[];

  @Field(() => Int)
  currentTournamentBracket: number;

  @Field(() => String)
  createdAt: string;
  @Field(() => String)
  updatedAt: string;
}
