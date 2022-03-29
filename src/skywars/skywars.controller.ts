import { Controller, Get, Query } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Skywars } from '../entities/Skywars';
import { getManager } from 'typeorm';

interface SkywarsRowsAndCountAll {
  rows: Skywars[];
  pageCount: number;
}

@Controller('skywars')
export class SkywarsController {
  @Get('/top')
  async getSkywarsTop(
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
    @Query('col') col: string = 'games_won'
  ): Promise<SkywarsRowsAndCountAll> {
    const skip = (page - 1) * limit != 0 ? (page - 1) * limit : '';
    const count = await Skywars.count();
    const pageCount: number = Math.ceil(count / limit);

    const entityManager = getManager();
    const rows = await entityManager.query(`
    SELECT * FROM 
    skywars 
    INNER JOIN 
    player_profile ON skywars.uuid = player_profile.uuid
    ORDER BY ${col} 
    DESC LIMIT ${limit} ${skip};
    `);

    return { rows, pageCount };
  }
}
