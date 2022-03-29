import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerProfile } from '../entities/PlayerProfile';
import { Thebridge } from '../entities/Thebridge';
import { ThebridgeController } from './thebridge.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Thebridge, PlayerProfile])],
  controllers: [ThebridgeController],
  providers: [],
  exports: [TypeOrmModule]
})
export class ThebridgeModule {}
