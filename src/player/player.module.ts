import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from '../entities/Player';
import { Skywars } from '../entities/Skywars';
import { SkywarsService } from '../skywars/shared/skywars.service';
import { PlayerController } from './player.controller';
import { PlayerService } from './shared/player.service';

@Module({
  imports: [TypeOrmModule.forFeature([Player, Skywars])],
  controllers: [PlayerController],
  providers: [PlayerService, SkywarsService],
  exports: [TypeOrmModule]
})
export class PlayerModule {}
