import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePlayerInput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  avatarUrl: string;
}
