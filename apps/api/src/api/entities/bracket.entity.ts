import { Field, ObjectType } from '@nestjs/graphql';
import { Tournament } from './tournament.entity';
import { Team } from './team.entity';
import { Seed } from './seed.entity';
import { Player } from './player.entity';

@ObjectType()
export class Bracket {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => Boolean)
  roundIsFinished: boolean;

  @Field(() => Seed, { nullable: true })
  seed: Seed;

  @Field(() => Player, { nullable: true })
  winnerPlayer: Player;

  @Field(() => String)
  winnerPlayerId: string;

  @Field(() => Tournament, { nullable: true })
  tournament: Tournament;

  @Field(() => String)
  tournamentId: string;
}
