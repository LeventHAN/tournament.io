import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateTournamentInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  gameType: string;

  @IsNotEmpty()
  @Field(() => String, { nullable: false })
  tournamentHostPlayerId!: string;
}
