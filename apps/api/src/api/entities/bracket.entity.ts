import { Field, ObjectType } from '@nestjs/graphql';
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

  @Field(() => [Seed], { nullable: false })
  seeds: Seed[];

  @Field(() => Player, { nullable: true })
  winnerPlayer: Player;

  @Field(() => String)
  winnerPlayerId: string;
}
