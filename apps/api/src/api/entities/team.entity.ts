import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Player } from './player.entity';
import { Seed } from './seed.entity';

@ObjectType()
export class Team {
  @Field(() => String)
  id: string;

  @Field(() => [Player])
  players: Player[];

  @Field(() => Int)
  score: number;

  @Field(() => Seed, { nullable: true })
  seed: Seed;
}
