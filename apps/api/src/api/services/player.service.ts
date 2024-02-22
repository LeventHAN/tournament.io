import { Injectable } from '@nestjs/common';
import { UpdateTournamentInput } from '../dto/update-tournament.input';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlayerInput } from '../dto/create-player.input';

@Injectable()
export class PlayerService {
  constructor(private prisma: PrismaService) {}
  create(createPlayerInput: CreatePlayerInput) {
    return this.prisma.player.create({
      data: createPlayerInput,
    });
  }

  findAll() {
    return this.prisma.player.findMany();
  }

  findOne(id: string) {
    return this.prisma.player.findUnique({
      where: { id: id },
    });
  }

  update(id: string, updatePlayerInput: UpdateTournamentInput) {
    return `This action updates a #${id} player`;
  }

  remove(id: string) {
    return `This action removes a #${id} player`;
  }
}
