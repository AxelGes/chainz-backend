import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Put,
  Delete
} from '@nestjs/common';
import { Player } from '../entities/Player';
import { UpdateResult, DeleteResult, InsertResult } from 'typeorm';
import { Skywars } from '../entities/Skywars';

interface SkywarsUpdateData extends Skywars {
  coins: number;
}

@Controller('player')
export class PlayerController { 

  @Get()
  async getAll(): Promise<Player[]> {
    return Player.find();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Player> {
    return Player.findOne(id);
  }

  @Post()
  async insert(@Body() player: Player): Promise<InsertResult> {
    player.skywars = Skywars.create({
      games_played: 0,
      games_won: 0,
      kills: 0,
      deaths: 0
    });

    await Skywars.insert(player.skywars)
    return Player.insert(player);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() player: Player
  ): Promise<UpdateResult> {
    return Player.update(id, player);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return Player.delete(id);
  }

  @Put(':uuid/skywars')
  async updateSkywars(
    @Param('uuid') uuid: number,
    @Body() skywarsData: SkywarsUpdateData
  ): Promise<UpdateResult> {
    const player = await Player.findOne({
      where: { uuid },
      relations: ['skywars']
    });

    if (skywarsData.games_played) {
      player.skywars.games_played += skywarsData.games_played;
    }

    if (skywarsData.games_won) {
      player.skywars.games_won += skywarsData.games_won;
    }

    if (skywarsData.kills) {
      player.skywars.kills += skywarsData.kills;
    }

    if (skywarsData.deaths) {
      player.skywars.deaths += skywarsData.deaths;
    }

    if (skywarsData.coins) {
      player.coins += skywarsData.coins;
    }

    await Skywars.update(player.skywars.id, player.skywars);
    return Player.update(player.id, player);
  }

  @Get(':uuid/stats')
  async getPlayerStats(
    @Param('uuid') uuid: number
  ): Promise<Player> {
    return Player.findOne({
      where: { uuid },
      relations: ['skywars']
    });
  }
}
