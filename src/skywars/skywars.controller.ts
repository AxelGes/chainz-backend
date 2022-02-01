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

@Controller('skywars')
export class SkywarsController { 

  @Get()
  async getAll(): Promise<Skywars[]> {
    return Skywars.find();
  }

  @Get('/top')
  async getSkywarsTop(
    @Query('limit') limit: number = 10,
    @Query('col') col?: string
  ): Promise<Skywars[]> {
    switch (col) {
      case "gamesPlayed":
        return Skywars.find({relations: ['player'], order: {gamesPlayed: "DESC" as any}, take: limit});
      case "gamesWon":
          return Skywars.find({relations: ['player'], order: {gamesWon: "DESC" as any}, take: limit});
      case "kills":
            return Skywars.find({relations: ['player'], order: {kills: "DESC" as any}, take: limit});
      default:
        return Skywars.find({relations: ['player'], order: {gamesWon: "DESC" as any}, take: limit});
      }

  }
}
