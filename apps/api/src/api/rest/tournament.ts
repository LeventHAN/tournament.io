import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { TournamentService } from '../services/tournament.service';
import { AuthService } from '../services/auth.service';
import { CreateTournamentInput } from '../dto/create-tournament.input';
import { Request } from 'express';

@Controller('tournament')
export class TournamentController {
  constructor(
    private readonly tournamentService: TournamentService,
    private readonly authService: AuthService
  ) {}

  @Post('createTournament')
  async createTournament(
    @Body() createTournamentInput: CreateTournamentInput,
    @Res() response,
    @Req() context: Request
  ) {
    // Get JWT token from request headers
    const token = context.headers.authorization?.split(' ')[1];

    // Verify and decode JWT token to get user ID
    // You'll need to replace this with your own JWT verification logic
    const decodedToken = await this.authService.decodeAndVerifyToken(token);

    // Check if the decoded token contains the necessary information
    if (!decodedToken || !decodedToken.sub) {
      throw new UnauthorizedException('Invalid or missing JWT token');
    }

    createTournamentInput.tournamentHostPlayerId = decodedToken.sub;

    const tournament = await this.tournamentService.create(
      createTournamentInput
    );

    return response.status(HttpStatus.OK).json(tournament);
  }
}
