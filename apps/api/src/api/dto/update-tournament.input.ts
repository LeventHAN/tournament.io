import { CreateTournamentInput } from './create-tournament.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTournamentInput extends PartialType(CreateTournamentInput) {
  @Field(() => String)
  id: string;
}
