import {
  Controller,
  Get,
  Query
} from '@nestjs/common';
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
    @Query('col') col?: string
  ): Promise<ThebridgeRowsAndCountAll> {
    const skip = (page - 1) * limit;
    const count = await Thebridge.count();
    const pageCount: number = Math.ceil(count / limit);

    let rows: Thebridge[];

    switch (col) {
      case 'gamesPlayed':
        rows = await Thebridge.find({ relations: ['player'], order: { gamesPlayed: "DESC", id: "ASC" }, take: limit, skip });
        break;
      case 'gamesWon':
        rows = await Thebridge.find({ relations: ['player'], order: { gamesWon: "DESC", id: "ASC" }, take: limit, skip });
        break;
      case 'scoredPoints':
        rows = await Thebridge.find({ relations: ['player'], order: { scoredPoints: "DESC", id: "ASC" }, take: limit, skip });
        break;
      case 'kills':
        rows = await Thebridge.find({ relations: ['player'], order: { kills: "DESC", id: "ASC" }, take: limit, skip });
        break;
      default:
        rows = await Thebridge.find({ relations: ['player'], order: { gamesWon: "DESC", id: "ASC" }, take: limit, skip });
        break;
    }

    return { rows, pageCount }
  }
}
