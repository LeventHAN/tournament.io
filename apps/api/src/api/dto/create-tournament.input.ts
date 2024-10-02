import graphqlTypeJson from 'graphql-type-json';
import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import type { JsonArray } from '@prisma/client/runtime/library';

@InputType()
export class CreateTournamentInput {
  @Field(() => String)
  name: string;

  @Field(() => [graphqlTypeJson], { nullable: true })
  description: JsonArray;

  @Field(() => String)
  gameType: string;

  @IsNotEmpty()
  @Field(() => String, { nullable: false })
  tournamentHostPlayerId!: string;
}
