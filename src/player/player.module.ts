import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Thebridge } from 'src/entities/Thebridge';
import { PlayerWallet } from '../entities/PlayerWallet';
import { Skywars } from '../entities/Skywars';
import { PlayerController } from './player.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerWallet, Skywars, Thebridge])],
  controllers: [PlayerController],
  providers: [],
  exports: [TypeOrmModule]
})
export class PlayerModule {}
