import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Thebridge } from 'src/entities/Thebridge';
import { Player } from '../entities/Player';
import { Skywars } from '../entities/Skywars';
import { PlayerController } from './player.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Player, Skywars, Thebridge])],
  controllers: [PlayerController],
  providers: [],
  exports: [TypeOrmModule]
})
export class PlayerModule {}
