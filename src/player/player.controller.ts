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
import { Skywars } from '../entities/Skywars';
import { Thebridge } from 'src/entities/Thebridge';
import * as Jwt from 'njwt';
import { UpdateResult } from 'typeorm';
import { ethers } from 'ethers';

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

  @Get(':uuid/generate-token')
  generateToken(@Param('uuid') uuid: string): { url: string } {
    const payload = { sub: uuid, iss: 'chainz' }
    const token = Jwt.create(payload, 'test');
    return { url: "https://chainz-frontend.vercel.app/verify?token=" + token.compact() };
  }

  @Post('/verify-token')
  async verifyToken(@Body() body: { token: string, signer: string, signature: string }): Promise<UpdateResult> {
    try {
      const verifiedJwt = Jwt.verify(body.token, 'test');

      if (!verifiedJwt) {
        return;
      }

      const signerAddr = ethers.utils.verifyMessage(body.token, body.signature);
      if (signerAddr !== body.signer) {
        return;
      }

      await Player.update({ wallet: signerAddr }, { wallet: null })

      return Player.update({ uuid: (verifiedJwt.body as any).sub }, { wallet: signerAddr });
    } catch (err) {
      return err;
    }
  }

}