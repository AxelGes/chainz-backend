import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from '../entities/Player';
import { Skywars } from '../entities/Skywars';
import { PlayerController } from './player.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Player, Skywars])],
  controllers: [PlayerController],
  providers: [],
  exports: [TypeOrmModule]
})
export class PlayerModule {}
