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

@Controller('thebridge')
export class ThebridgeController { 

  @Get()
  async getAll(): Promise<Thebridge[]> {
    return Thebridge.find();
  }

  @Get('/top')
  async getThebridgeTop(
    @Query('limit') limit: number = 10,
    @Query('col') col?: string
  ): Promise<Thebridge[]> {
    switch (col) {
      case "gamesPlayed":
        return Thebridge.find({relations: ['player'], order: {gamesPlayed: "DESC" as any}, take: limit});
      case "gamesWon":
          return Thebridge.find({relations: ['player'], order: {gamesWon: "DESC" as any}, take: limit});
      case "scoredPoints":
            return Thebridge.find({relations: ['player'], order: {scoredPoints: "DESC" as any}, take: limit});
      default:
        return Thebridge.find({relations: ['player'], order: {gamesWon: "DESC" as any}, take: limit});
      }

  }
}
