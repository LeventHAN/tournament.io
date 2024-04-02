import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UpdateTournamentInput } from '../dto/update-tournament.input';
import { Tournament } from '../entities/tournament.entity';
import { TournamentService } from '../services/tournament.service';
import { CreateTournamentInput } from '../dto/create-tournament.input';
import { AuthService } from '../services/auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { AddParticipantToTournamentInput } from '../dto/add-participant-to-tournament.input';

@Resolver(() => Tournament)
export class TournamentResolver {
  constructor(
    private readonly tournamentService: TournamentService,
    private readonly authService: AuthService
  ) {}

  @Mutation(() => Tournament)
  async addParticipantToTournament(
    @Args('addParticipantToTournamentInput')
    addParticipantToTournamentInput: AddParticipantToTournamentInput,
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

    return this.tournamentService.addParticipant(
      addParticipantToTournamentInput,
      decodedToken.sub
    );
  }

  @Mutation(() => Tournament)
  async removeParticipantFromTournament(
    @Args('removeParticipantFromTournamentInput')
    removeParticipantFromTournamentInput: AddParticipantToTournamentInput,
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

    return this.tournamentService.removeParticipant(
      removeParticipantFromTournamentInput,
      decodedToken.sub
    );
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
