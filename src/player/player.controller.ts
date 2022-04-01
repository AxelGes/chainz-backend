import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Query,
  NotFoundException,
  BadRequestException
} from '@nestjs/common';
import { PlayerWallet } from '../entities/PlayerWallet';
import * as Jwt from 'njwt';
import { ethers } from 'ethers';
import { getManager } from 'typeorm';
@Controller('player')
export class PlayerController {
  @Get()
  async getPlayerByWallet(
    @Query('wallet') wallet: string
  ): Promise<PlayerWallet> {
    wallet = "'" + wallet + "'";

    const entityManager = getManager();

    const player = await entityManager.query(`
    SELECT * FROM  
    player_wallet 
    INNER JOIN 
    player_profile ON player_wallet.uuid = player_profile.uuid
    WHERE player_wallet.wallet = ${wallet} 
    LIMIT 1;
    `);

    if (!player[0]) {
      throw new NotFoundException();
    }

    return player[0];
  }

  //TODO: Hacer que agrupe las stats en objects adentro del player xd
  /*@Get('/:uuid')
  async getPlayerStatsByUUID(
    @Param('uuid') uuid: string
  ): Promise<PlayerWallet> {
    uuid = "'" + uuid + "'";

    const entityManager = getManager();

    const player = await entityManager.query(`
    SELECT player.id, player.uuid, * FROM  
    player_profile 
    LEFT JOIN 
    skywars ON player_profile.uuid = skywars.uuid
    LEFT JOIN 
    thebridge ON player_profile.uuid = thebridge.uuid
    WHERE player_profile.uuid = ${uuid} 
    LIMIT 1;
    `);

    if (!player[0]) {
      throw new NotFoundException();
    }

    return player[0];
  }*/

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

      const player = await PlayerWallet.findOne({ wallet: signerAddr });

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
}
