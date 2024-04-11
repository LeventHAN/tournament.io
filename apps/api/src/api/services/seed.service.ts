import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SeedService {
  constructor(private prisma: PrismaService) {}

  async updateWinnerSeed(id: string) {
    throw new Error('Method not implemented.');
    /*
    return await this.prisma.seed.update({
      where: { id },
      data: {
        teams: {
          update: {
            data: {
              // TODO: WE DO NOT SUPPORT SCORE IN DATABASE. WE SHOULD REWRITE THE TEAMS TO HAVE A WINNER FIELD
            },
          },
        },
      },
    });
    */
  }
}
