import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class RemoveParticipantFromTournamentInput {
  @IsNotEmpty()
  @Field(() => String)
  tournamentId: string;
}
