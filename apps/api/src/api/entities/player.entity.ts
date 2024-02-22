import { Field, ObjectType } from '@nestjs/graphql';
import { Tournament } from './tournament.entity';
import { Team } from './team.entity';
import { Bracket } from './bracket.entity';

@ObjectType()
export class Player {
  @Field(() => String)
  id: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  avatarUrl: string;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;

  // @Field(() => [Team], { nullable: true })
  participatedTeams: Team[];

  @Field(() => Tournament, { nullable: true })
  tournament: Tournament;

  // @Field(() => [Bracket], { nullable: true })
  bracket: Bracket[];
}
