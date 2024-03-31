import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class AddParticipantToTournamentInput {
  @IsNotEmpty()
  @Field(() => String)
  tournamentId: string;
}
