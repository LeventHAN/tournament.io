import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UpdateTournamentInput } from '../dto/update-tournament.input';
import { Tournament } from '../entities/tournament.entity';
import { TournamentService } from '../services/tournament.service';
import { CreateTournamentInput } from '../dto/create-tournament.input';

@Resolver(() => Tournament)
export class TournamentResolver {
  constructor(private readonly tournamentService: TournamentService) {}

  @Mutation(() => Tournament)
  createTournament(
    @Args('createTournamentInput') createTournamentInput: CreateTournamentInput
  ) {
    return this.tournamentService.create(createTournamentInput);
  }

  @Query(() => [Tournament], { name: 'tournament' })
  findAll() {
    return this.tournamentService.findAll();
  }

  @Query(() => Tournament, { name: 'tournament' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.tournamentService.findOne(id);
  }

  @Mutation(() => Tournament)
  updateApi(@Args('updateApiInput') updateApiInput: UpdateTournamentInput) {
    return this.tournamentService.update(updateApiInput.id, updateApiInput);
  }

  @Mutation(() => Tournament)
  removeApi(@Args('id', { type: () => String }) id: string) {
    return this.tournamentService.remove(id);
  }
}
