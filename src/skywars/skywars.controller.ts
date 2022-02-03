import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Put,
  Delete,
  Query
} from '@nestjs/common';
import { Skywars } from '../entities/Skywars';

interface SkywarsRowsAndCountAll {
  rows: Skywars[];
  pages: number;
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
    const pages: number = Math.ceil(count / limit);

    let rows: Skywars[];

    if (col) {
      if (col == 'gamesPlayed') {
        rows = await Skywars.find({ relations: ['player'], order: { gamesPlayed: "DESC", id: "ASC" }, take: limit, skip });
      }

      if (col == 'gamesWon') {
        rows = await Skywars.find({ relations: ['player'], order: { gamesWon: "DESC", id: "ASC" }, take: limit, skip });
      }

      if (col == 'kills') {
        rows = await Skywars.find({ relations: ['player'], order: { kills: "DESC", id: "ASC" }, take: limit, skip });
      }
    } else {
      rows = await Skywars.find({ relations: ['player'], order: { gamesWon: "DESC", id: "ASC" }, take: limit, skip });
    }

    return { rows, pages }
  }
}
