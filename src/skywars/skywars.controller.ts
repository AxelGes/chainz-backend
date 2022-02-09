import {
  Controller,
  Get,
  Query
} from '@nestjs/common';
import { Skywars } from '../entities/Skywars';

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
    @Query('col') col?: string
  ): Promise<SkywarsRowsAndCountAll> {
    const skip = (page - 1) * limit;
    const count = await Skywars.count();
    const pageCount: number = Math.ceil(count / limit);

    let rows: Skywars[];

    switch (col) {
      case 'gamesPlayed':
        rows = await Skywars.find({ relations: ['player'], order: { gamesPlayed: "DESC", id: "ASC" }, take: limit, skip });
        break;
      case 'gamesWon':
        rows = await Skywars.find({ relations: ['player'], order: { gamesWon: "DESC", id: "ASC" }, take: limit, skip });
        break;
      case 'kills':
        rows = await Skywars.find({ relations: ['player'], order: { kills: "DESC", id: "ASC" }, take: limit, skip });
        break;
      default:
        rows = await Skywars.find({ relations: ['player'], order: { gamesWon: "DESC", id: "ASC" }, take: limit, skip });
        break;
    }

    return { rows, pageCount }
  }
}
