import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class StartTournamentInput {
  @IsNotEmpty()
  @Field(() => String)
  id: string;
}
