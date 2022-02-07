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
import { Player } from '../entities/Player';
import { UpdateResult, DeleteResult, InsertResult } from 'typeorm';
import { Skywars } from '../entities/Skywars';
import { Thebridge } from 'src/entities/Thebridge';

interface SkywarsUpdateData extends Skywars {
  coins: number;
}

interface ThebridgeUpdateData extends Thebridge {
  coins: number;
}

@Controller('player')
export class PlayerController {

  @Get()
  async getAll(): Promise<Player[]> {
    return Player.find();
  }

  @Get(':uuid')
  async getByUuid(@Param('uuid') uuid: string, @Query('username') username: string): Promise<Player> {
    const player = await Player.findOne({
      where: { uuid }, relations: ['skywars', 'thebridge']
    });

    if (!player) {
      await Player.insert({ uuid, username } as Player);
    } else if (player.username !== username) {
      await Player.update({ id: player.id }, { username });
    }
    else {
      return player;
    }

    return Player.findOne({
      where: { uuid }, relations: ['skywars', 'thebridge']
    });
  }

  @Put(':uuid/skywars')
  async updateSkywars(
    @Param('uuid') uuid: string,
    @Body() skywarsData: SkywarsUpdateData
  ): Promise<Player> {
    const player = await Player.findOne({
      where: { uuid },
      relations: ['skywars']
    });

    if (!player.skywars) {
      player.skywars = Skywars.create(skywarsData);
    } else {
      if (skywarsData.gamesPlayed) {
        player.skywars.gamesPlayed += skywarsData.gamesPlayed;
      }

      if (skywarsData.gamesWon) {
        player.skywars.gamesWon += skywarsData.gamesWon;
      }

      if (skywarsData.kills) {
        player.skywars.kills += skywarsData.kills;
      }

      if (skywarsData.deaths) {
        player.skywars.deaths += skywarsData.deaths;
      }
    }

    if (skywarsData.coins) {
      player.coins += skywarsData.coins;
    }

    return Player.save(player);
  }

  @Put(':uuid/thebridge')
  async updateThebridge(
    @Param('uuid') uuid: string,
    @Body() thebridgeData: ThebridgeUpdateData
  ): Promise<Player> {
    const player = await Player.findOne({
      where: { uuid },
      relations: ['thebridge']
    });

    if (!player.thebridge) {
      player.thebridge = Thebridge.create(thebridgeData);
    } else {
      if (thebridgeData.gamesPlayed) {
        player.thebridge.gamesPlayed += thebridgeData.gamesPlayed;
      }

      if (thebridgeData.gamesWon) {
        player.thebridge.gamesWon += thebridgeData.gamesWon;
      }

      if (thebridgeData.kills) {
        player.thebridge.kills += thebridgeData.kills;
      }

      if (thebridgeData.deaths) {
        player.thebridge.deaths += thebridgeData.deaths;
      }

      if (thebridgeData.scoredPoints) {
        player.thebridge.scoredPoints += thebridgeData.scoredPoints;
      }
    }

    if (thebridgeData.coins) {
      player.coins += thebridgeData.coins;
    }

    return Player.save(player);
  }

  @Get(':uuid/stats')
  async getPlayerStats(
    @Param('uuid') uuid: string
  ): Promise<Player> {
    return Player.findOne({
      where: { uuid },
      relations: ['skywars', 'thebridge']
    });
  }

  @Get(':uuid/verify')
  verify(@Param('uuid') uuid: string): string {
    return uuid;
  }

}