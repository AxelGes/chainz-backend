import { Controller, Get, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skywars } from '../entities/Skywars';

interface SkywarsRowsAndCountAll {
  rows: Skywars[];
  pageCount: number;
}

@Controller('skywars')
export class SkywarsController {
  constructor(
    @InjectRepository(Skywars)
    private skywarsRepository: Repository<Skywars>
  ) { }

  @Get('/top')
  async getSkywarsTop(
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
    @Query('col') col: string = 'games_won'
  ): Promise<any> {
    const skip = (page - 1) * limit;

    // Using QueryBuilder to join Thebridge with PlayerProfile
    const queryBuilder = this.skywarsRepository.createQueryBuilder('skywars')
      .innerJoinAndSelect('skywars.playerProfile', 'playerProfile')
      .orderBy(`skywars.${col}`, 'DESC')
      .offset(skip)
      .limit(limit);


    const rows = await queryBuilder.getMany();
    const extendedRows = rows.map((row) => ({
      ...row,
      name: row.playerProfile.name,
    }));

    const count = await queryBuilder.getCount();
    const pageCount = Math.ceil(count / limit);

    return { rows: extendedRows, pageCount };
  }
}
