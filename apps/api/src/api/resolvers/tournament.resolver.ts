import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UpdateTournamentInput } from '../dto/update-tournament.input';
import { Tournament } from '../entities/tournament.entity';
import { TournamentService } from '../services/tournament.service';
import { AuthService } from '../services/auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { AddParticipantToTournamentInput } from '../dto/add-participant-to-tournament.input';
import { RemoveParticipantFromTournamentInput } from '../dto/remove-participant-from-tournament.input';
import { MyWebSocketGateway } from '../websocket.gateway';
import { StartTournamentInput } from '../dto/start-tournament-input';

@Resolver(() => Tournament)
export class TournamentResolver {
  constructor(
    private readonly tournamentService: TournamentService,
    private readonly authService: AuthService,
    private readonly socketGateway: MyWebSocketGateway
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

    const res = await this.tournamentService.addParticipant(
      addParticipantToTournamentInput,
      decodedToken.sub
    );

    this.socketGateway.server.emit('tournament:newParticipant', {
      tournamentId: res.id,
    });

    return res;
  }

  @Mutation(() => Tournament)
  async removeParticipantFromTournament(
    @Args('removeParticipantFromTournamentInput')
    removeParticipantFromTournamentInput: RemoveParticipantFromTournamentInput,
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

    const res = await this.tournamentService.removeParticipant(
      removeParticipantFromTournamentInput,
      decodedToken.sub
    );

    this.socketGateway.server.emit('tournament:newParticipant', {
      tournamentId: res.id,
    });

    return res;
  }

  @Mutation(() => Tournament)
  async startTournament(
    @Args('startTournamentInput')
    startTournamentInput: StartTournamentInput,
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

    const tournament = await this.tournamentService.findOne(
      startTournamentInput.id
    );

    if (tournament.tournamentHostPlayer.id !== decodedToken.sub) {
      throw new UnauthorizedException(
        'Only the host of the tournament can start it'
      );
    }

    const res = await this.tournamentService.startTournament(
      startTournamentInput.id
    );

    this.socketGateway.server.emit('tournament:start', {
      tournamentId: res.id,
    });

    return res;
  }

  @Query(() => [Tournament], { name: 'tournament' })
  findAll() {
    return this.tournamentService.findAll();
  }

  @Query(() => Tournament, { name: 'tournament' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.tournamentService.findOne(id);
  }

  @Query(() => Tournament, { name: 'tournamentWithBracketsSeedTeams' })
  async findTournamentWithBracketsAndWithItsSeedsAndTeams(
    @Args('id', { type: () => String }) id: string
  ) {
    return this.tournamentService.findTournamentWithBracketsAndWithItsSeedsAndTeams(
      id
    );
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
