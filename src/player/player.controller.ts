import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post, Query } from '@nestjs/common';
import { ethers } from 'ethers';
import * as Jwt from 'njwt';
import { PlayerProfile } from 'src/entities/PlayerProfile';
import { Skywars } from 'src/entities/Skywars';
import { Thebridge } from 'src/entities/Thebridge';
import { Repository } from 'typeorm';

import { PlayerWallet } from '../entities/PlayerWallet';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('player')
export class PlayerController {
  constructor(
    @InjectRepository(PlayerWallet)
    private playerWalletRepository: Repository<PlayerWallet>,
    @InjectRepository(PlayerProfile)
    private playerProfileRepository: Repository<PlayerProfile>
  ) {}

  @Get()
  async getPlayerByWallet(@Query('wallet') wallet: string): Promise<PlayerWallet> {
    const player = await this.playerWalletRepository
      .createQueryBuilder('player_wallet')
      .innerJoinAndSelect('player_profile', 'profile', 'player_wallet.uuid = profile.uuid')
      .where('player_wallet.wallet = :wallet', { wallet })
      .getOne();

    if (!player) {
      throw new NotFoundException();
    }

    return player;
  }

  @Get('/generate-token')
  generateToken(@Query('uuid') uuid: string): { url: string } {
    const payload = { sub: uuid, iss: 'chainz' };
    const token = Jwt.create(payload, 'test');
    return {
      url: 'https://chainz-frontend.vercel.app/verify?token=' + token.compact()
    };
  }

  @Post('/verify-token')
  async verifyToken(
    @Body() body: { token: string; signer: string; signature: string }
  ) {
    try {
      const verifiedJwt = Jwt.verify(body.token, 'test');

      if (!verifiedJwt) {
        throw new BadRequestException();
      }

      const signerAddr = ethers.utils.verifyMessage(body.token, body.signature);
      if (signerAddr !== body.signer) {
        throw new BadRequestException();
      }

      await PlayerWallet.update(
        { uuid: (verifiedJwt.body as any).sub },
        { uuid: null }
      );

      const player = await PlayerWallet.findOne({ where: { wallet: signerAddr } });

      if (player) {
        return PlayerWallet.update({ wallet: signerAddr }, {
          uuid: (verifiedJwt.body as any).sub
        } as PlayerWallet);
      }

      return PlayerWallet.save({
        wallet: signerAddr,
        uuid: (verifiedJwt.body as any).sub
      } as PlayerWallet);
    } catch (err) {
      return err;
    }
  }

  @Get('/:uuid')
  async getPlayerStatsByUUID(@Param('uuid') uuid: string) {
    const playerProfile = await this.playerProfileRepository
      .createQueryBuilder('player_profile')
      .leftJoinAndMapOne(
        'player_profile.skywarsData',
        Skywars,
        'skywars',
        'player_profile.uuid = skywars.uuid'
      )
      .leftJoinAndMapOne(
        'player_profile.thebridgeData',
        Thebridge,
        'thebridge',
        'player_profile.uuid = thebridge.uuid'
      )
      .where('player_profile.uuid = :uuid', { uuid })
      .getOne();

    if (!playerProfile) {
      throw new NotFoundException(`Player with UUID ${uuid} not found.`);
    }

    return playerProfile;
  }
}
