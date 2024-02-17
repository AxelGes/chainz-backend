import { Controller, Get, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skywars } from '../entities/Skywars';
import { PlayerProfile } from '../entities/PlayerProfile';

interface SkywarsRowsAndCountAll {
  rows: Skywars[];
  pageCount: number;
}

@Controller('skywars')
export class SkywarsController {
  constructor(
    @InjectRepository(Skywars)
    private skywarsRepository: Repository<Skywars>
  ) {}

  @Get('/top')
  async getSkywarsTop(
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
    @Query('col') col: string = 'games_won'
  ): Promise<SkywarsRowsAndCountAll> {
    const skip = (page - 1) * limit;

    // Using QueryBuilder to join Thebridge with PlayerProfile
    const queryBuilder = this.skywarsRepository.createQueryBuilder('skywars')
      .innerJoinAndSelect(PlayerProfile, 'playerProfile', 'skywars.uuid = playerProfile.uuid')
      .orderBy(`skywars.${col}`, 'DESC')
      .offset(skip)
      .limit(limit);

    const rows = await queryBuilder.getMany();
    const count = await queryBuilder.getCount();
    const pageCount = Math.ceil(count / limit);

    return { rows, pageCount };
  }
}
