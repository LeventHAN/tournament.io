import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Tournament {
  @Field(() => String)
  id: string;

  @Field(() => String)
  tournamentName: string;

  @Field(() => Int)
  currentTournamentBracket: number;

  @Field(() => String)
  createdAt: string;
  @Field(() => String)
  updatedAt: string;
}
