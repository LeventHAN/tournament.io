import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTournamentInput } from '../dto/create-tournament.input';
import { UpdateTournamentInput } from '../dto/update-tournament.input';
import { PrismaService } from '../prisma/prisma.service';
import { AddParticipantToTournamentInput } from '../dto/add-participant-to-tournament.input';
import { Player, Team } from '@prisma/client';

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

  async startTournament(tournamentId: string, bracketSize = 2) {
    const tournamentToUpdate = await this.prisma.tournament.findUnique({
      where: { id: tournamentId },
      include: {
        tournamentParticipants: true,
        brackets: true,
      },
    });

    if (!tournamentToUpdate) {
      throw new NotFoundException('Tournament not found');
    }

    const participants = tournamentToUpdate.tournamentParticipants;

    // Pair participants randomly into brackets
    const randomPairedParticipantsPerBracket = participants
      .sort(() => 0.5 - Math.random())
      .reduce((acc, participant, index) => {
        const bracketIndex = Math.floor(index / bracketSize);
        if (!acc[bracketIndex]) {
          acc[bracketIndex] = [];
        }
        acc[bracketIndex].push(participant);
        return acc;
      }, [] as Player[][]);

    const createdTeams = await Promise.all(
      randomPairedParticipantsPerBracket.map(
        async (participants, bracketIndex) => {
          const teams = [];
          for (let i = 0; i < participants.length; i += 2) {
            // for every participant create team

            const team1Player = participants[i];
            const team2Player = participants[i + 1];

            const createTeam1 = await this.prisma.team.create({
              data: {
                score: 0,
                players: {
                  connect: [{ id: team1Player.id }],
                },
                seed: { create: {} },
              },
              include: { seed: true },
            });

            const createTeam2 = await this.prisma.team.create({
              data: {
                score: 0,
                players: {
                  connect: [{ id: team2Player.id }],
                },
                seed: { connect: { id: createTeam1.seedId } },
              },
              include: { seed: true },
            });
            teams.push(createTeam1, createTeam2);
          }
          return teams;
        }
      )
    );

    await this.prisma.bracket.create({
      data: {
        title: 'Round 1',
        roundIsFinished: false,
        seeds: {
          connect: createdTeams.map((team) => ({ id: team[0].seedId })),
        },
        tournament: { connect: { id: tournamentId } },
      },
    });

    // Update tournament details
    return this.prisma.tournament.update({
      where: { id: tournamentId },
      include: {
        brackets: true,
        tournamentParticipants: true,
      },
      data: {
        currentTournamentBracket: 0,
        updatedAt: new Date(),
      },
    });
  }

  findTournamentWithBracketsAndWithItsSeedsAndTeams(tournamentId: string) {
    return this.prisma.tournament.findUnique({
      where: { id: tournamentId },
      include: {
        tournamentHostPlayer: true,
        brackets: {
          include: {
            seeds: {
              include: {
                teams: {
                  include: {
                    players: true,
                  },
                },
              },
            },
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
