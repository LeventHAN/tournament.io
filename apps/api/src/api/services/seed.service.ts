import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SeedService {
  constructor(private prisma: PrismaService) {}

  async updateWinnerSeed(id: string, teamId: string, seedId: string) {
    return this.prisma.seed.update({
      where: { id: seedId },
      data: {
        teams: {
          updateMany: {
            where: {
              id: teamId,
            },
            data: {
              score: {
                increment: 1,
              },
            },
          },
        },
      },
    });
  }
}
