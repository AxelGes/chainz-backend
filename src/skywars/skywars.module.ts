import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerProfile } from '../entities/PlayerProfile';
import { Skywars } from '../entities/Skywars';
import { SkywarsController } from './skywars.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Skywars, PlayerProfile])],
  controllers: [SkywarsController],
  providers: [],
  exports: [TypeOrmModule]
})
export class SkywarsModule {}
