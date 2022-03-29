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
@Controller('player')
export class PlayerController {
  @Get()
  async getPlayerByWallet(
    @Query('wallet') wallet: string
  ): Promise<PlayerWallet> {
    const player = await PlayerWallet.findOne({
      where: { wallet }
    });

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
