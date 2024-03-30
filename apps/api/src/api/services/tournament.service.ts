import { Injectable } from '@nestjs/common';
import { CreateTournamentInput } from '../dto/create-tournament.input';
import { UpdateTournamentInput } from '../dto/update-tournament.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TournamentService {
  constructor(private prisma: PrismaService) {}
  create(createTournamentInput: CreateTournamentInput) {
    return this.prisma.tournament.create({
      data: {
        tournamentName: createTournamentInput.name,
        currentTournamentBracket: 0,
        tournamentDescription: createTournamentInput.description,
        tournamentHostPlayer: {
          connect: {
            id: createTournamentInput.tournamentHostPlayerId,
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
    });
  }

  update(id: string, updateTournamentInput: UpdateTournamentInput) {
    return `This action updates a #${id} api`;
  }

  remove(id: string) {
    return `This action removes a #${id} api`;
  }
}
