import { Injectable } from '@nestjs/common';
import { CreateTournamentInput } from '../dto/create-tournament.input';
import { UpdateTournamentInput } from '../dto/update-tournament.input';
import { PrismaService } from '../prisma/prisma.service';
import { AddParticipantToTournamentInput } from '../dto/add-participant-to-tournament.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class TournamentService {
  constructor(private prisma: PrismaService) {}
  create(createTournamentInput: CreateTournamentInput) {
    return this.prisma.tournament.create({
      data: {
        tournamentName: createTournamentInput.name,
        currentTournamentBracket: 0,
        tournamentDescription: [createTournamentInput.description],
        tournamentHostPlayer: {
          connect: {
            id: createTournamentInput.tournamentHostPlayerId,
          },
        },
      },
    });
  }

  addParticipant(
    addParticipantToTournamentInput: AddParticipantToTournamentInput,
    playerId: string
  ) {
    return this.prisma.tournament.update({
      where: { id: addParticipantToTournamentInput.tournamentId },
      data: {
        tournamentParticipants: {
          connect: {
            id: playerId,
          },
        },
      },
    });
  }

  removeParticipant(
    removeParticipantFromTournamentInput: AddParticipantToTournamentInput,
    playerId: string
  ) {
    return this.prisma.tournament.update({
      where: { id: removeParticipantFromTournamentInput.tournamentId },
      data: {
        tournamentParticipants: {
          disconnect: {
            id: playerId,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.tournament.findMany();
  }

  findOne(id: string) {
    return this.prisma.tournament.findUnique({
      where: { id: id },
      include: {
        brackets: true,
        tournamentParticipants: true,
        tournamentHostPlayer: true,
      },
    });
  }

  update(id: string, updateTournamentInput: UpdateTournamentInput) {
    return `This action updates a #${id} api`;
  }

  remove(id: string) {
    return `This action removes a #${id} api`;
  }
}
