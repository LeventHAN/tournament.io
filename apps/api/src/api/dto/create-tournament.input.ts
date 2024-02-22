import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTournamentInput {
  @Field(() => String)
  exampleField: string;
}
