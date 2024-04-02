import graphqlTypeJson from 'graphql-type-json';
import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { Prisma } from '@prisma/client';

@InputType()
export class CreateTournamentInput {
  @Field(() => String)
  name: string;

  @Field(() => [graphqlTypeJson], { nullable: true })
  description: Prisma.JsonArray;

  @Field(() => String)
  gameType: string;

  @IsNotEmpty()
  @Field(() => String, { nullable: false })
  tournamentHostPlayerId!: string;
}
