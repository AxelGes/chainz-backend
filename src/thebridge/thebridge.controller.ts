import { Controller, Get, Query } from '@nestjs/common';
import { getManager } from 'typeorm';
import { Thebridge } from '../entities/Thebridge';

interface ThebridgeRowsAndCountAll {
  rows: Thebridge[];
  pageCount: number;
}

@Controller('thebridge')
export class ThebridgeController {
  @Get('/top')
  async getThebridgeTop(
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
    @Query('col') col: string = 'games_won'
  ): Promise<ThebridgeRowsAndCountAll> {
    const skip = (page - 1) * limit;
    const count = await Thebridge.count();
    const pageCount: number = Math.ceil(count / limit);

    const entityManager = getManager();
    const rows = await entityManager.query(`
    SELECT * FROM 
    thebridge 
    INNER JOIN 
    player_profile ON thebridge.uuid = player_profile.uuid
    ORDER BY ${col} DESC
    LIMIT ${limit} OFFSET ${skip};
    `);

    return { rows, pageCount };
  }
}
