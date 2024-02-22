import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UpdateTournamentInput } from '../dto/update-tournament.input';
import { Player } from '../entities/player.entity';
import { PlayerService } from '../services/player.service';
import { CreatePlayerInput } from '../dto/create-player.input';
import { ConflictException } from '@nestjs/common';

@Resolver(() => Player)
export class PlayerResolver {
  constructor(private readonly playerService: PlayerService) {}

  @Mutation(() => Player)
  async createPlayer(
    @Args('createPlayerInput') createPlayerInput: CreatePlayerInput
  ) {
    const existingPlayer = await this.playerService.findOne(
      createPlayerInput.id
    );

    if (existingPlayer) {
      throw new ConflictException('Player with the same ID already exists');
    }

    return this.playerService.create(createPlayerInput);
  }

  @Query(() => [Player], { name: 'player' })
  findAll() {
    return this.playerService.findAll();
  }

  @Query(() => Player, { name: 'player' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.playerService.findOne(id);
  }

  @Mutation(() => Player)
  updateApi(
    @Args('updatePlayerInput') updatePlayerInput: UpdateTournamentInput
  ) {
    return this.playerService.update(updatePlayerInput.id, updatePlayerInput);
  }

  @Mutation(() => Player)
  removeApi(@Args('id', { type: () => String }) id: string) {
    return this.playerService.remove(id);
  }
}
