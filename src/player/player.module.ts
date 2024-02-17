import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerWallet } from '../entities/PlayerWallet';
import { PlayerController } from './player.controller';
import { PlayerProfile } from 'src/entities/PlayerProfile';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerProfile, PlayerWallet])],
  controllers: [PlayerController],
  providers: [],
  exports: [TypeOrmModule]
})
export class PlayerModule {}
