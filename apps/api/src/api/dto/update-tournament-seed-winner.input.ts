import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateTournamentSeedWinnerInput {
  @IsNotEmpty()
  @Field(() => String)
  id: string;

  @IsNotEmpty()
  @Field(() => String)
  bracketId: string;

  @IsNotEmpty()
  @Field(() => String)
  seedId: string;

  @IsNotEmpty()
  @Field(() => String)
  winnerPlayerId: string;
}
