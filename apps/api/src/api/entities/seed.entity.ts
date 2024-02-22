import { Field, ObjectType } from '@nestjs/graphql';
import { Team } from './team.entity';
import { Bracket } from './bracket.entity';

@ObjectType()
export class Seed {
  @Field(() => String)
  id: string;

  @Field(() => String)
  date: string;

  @Field(() => [Team])
  teams: Team[];

  @Field(() => Bracket)
  bracket: Bracket;

  @Field(() => String)
  bracketId: string;
}
