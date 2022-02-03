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
import { Thebridge } from '../entities/Thebridge';

interface ThebridgeRowsAndCountAll {
  rows: Thebridge[];
  pages: number;
}

@Controller('thebridge')
export class ThebridgeController {

  @Get('/top')
  async getThebridgeTop(
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
    @Query('col') col?: string
  ): Promise<ThebridgeRowsAndCountAll> {
    const skip = (page - 1) * limit;
    const count = await Thebridge.count();
    const pages: number = Math.ceil(count / limit);

    let rows: Thebridge[];

    if (col) {
      if (col == 'gamesPlayed') {
        rows = await Thebridge.find({ relations: ['player'], order: { gamesPlayed: "DESC", id: "ASC" }, take: limit, skip });
      }

      if (col == 'gamesWon') {
        rows = await Thebridge.find({ relations: ['player'], order: { gamesWon: "DESC", id: "ASC" }, take: limit, skip });
      }

      if (col == 'scoredPoints') {
        rows = await Thebridge.find({ relations: ['player'], order: { scoredPoints: "DESC", id: "ASC" }, take: limit, skip });
      }
    } else {
      rows = await Thebridge.find({ relations: ['player'], order: { gamesWon: "DESC", id: "ASC" }, take: limit, skip });
    }

    return { rows, pages }
  }
}
