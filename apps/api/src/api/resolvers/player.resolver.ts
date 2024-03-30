import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UpdateTournamentInput } from '../dto/update-tournament.input';
import { Player } from '../entities/player.entity';
import { PlayerService } from '../services/player.service';
import { CreatePlayerInput } from '../dto/create-player.input';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Resolver(() => Player)
export class PlayerResolver {
  constructor(
    private readonly playerService: PlayerService,
    private readonly authService: AuthService
  ) {}

  @Mutation(() => Player)
  async createPlayer(
    @Args('createPlayerInput') createPlayerInput: CreatePlayerInput,
    @Context() context
  ) {
    // Get JWT token from request headers
    const token = context.req.headers.authorization?.split(' ')[1];

    // Verify and decode JWT token to get user ID
    // You'll need to replace this with your own JWT verification logic
    const decodedToken = await this.authService.decodeAndVerifyToken(token);

    // Check if the decoded token contains the necessary information
    if (!decodedToken || !decodedToken.sub) {
      throw new UnauthorizedException('Invalid or missing JWT token');
    }

    const existingPlayer = await this.playerService.findOne(decodedToken.sub);

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
