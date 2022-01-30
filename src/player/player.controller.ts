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
import { PlayerService } from './shared/player.service';
import { SkywarsService } from '../skywars/shared/skywars.service';
import { UpdateResult, DeleteResult } from 'typeorm';
import { Skywars } from '../entities/Skywars';

interface SkywarsUpdateData extends Skywars {
  coins: number;
}

@Controller('player')
export class PlayerController {
  constructor(
    private playerService: PlayerService,
    private skywarsService: SkywarsService
  ) {}

  @Get()
  async getAll(): Promise<Player[]> {
    return this.playerService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Player> {
    return this.playerService.getById(id);
  }

  @Post()
  async insert(@Body() player: Player): Promise<Player> {
    player.skywars = Skywars.create({
      games_played: 0,
      games_won: 0,
      kills: 0,
      deaths: 0
    });

    return this.playerService.insert(player);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() player: Player
  ): Promise<UpdateResult> {
    return this.playerService.update(id, player);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.playerService.delete(id);
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

    await this.skywarsService.update(player.skywars.id, player.skywars);
    return this.playerService.update(player.id, player);
  }
}
