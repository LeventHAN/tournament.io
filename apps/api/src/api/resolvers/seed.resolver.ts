import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from '../services/auth.service';
import { Seed } from '../entities/seed.entity';
import { SeedService } from '../services/seed.service';
import { UpdateTournamentSeedWinnerInput } from '../dto/update-tournament-seed-winner.input';
import { UnauthorizedException } from '@nestjs/common';
import { TournamentService } from '../services/tournament.service';

@Resolver(() => Seed)
export class SeedResolver {
  constructor(
    private readonly seedService: SeedService,
    private readonly tournamentService: TournamentService,
    private readonly authService: AuthService
  ) {}

  @Mutation(() => Seed)
  async updateTournamentSeedWinner(
    @Args('updateTournamentSeedWinnerInput')
    updateTournamentSeedWinnerInput: UpdateTournamentSeedWinnerInput,
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
      updateTournamentSeedWinnerInput.id
    );

    if (tournament.tournamentHostPlayer.id !== decodedToken.sub) {
      throw new UnauthorizedException(
        'Only the host of the tournament can set winners.'
      );
    }

    const res = await this.seedService.updateWinnerSeed(
      updateTournamentSeedWinnerInput.id
    );
    /*
    this.socketGateway.server.emit('tournament:start', {
      tournamentId: res.id,
    });
    */

    return res;
  }
}
