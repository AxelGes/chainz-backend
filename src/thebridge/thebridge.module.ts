import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from '../entities/Player';
import { Thebridge } from '../entities/Thebridge';
import { ThebridgeController } from './thebridge.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Player, Thebridge])],
  controllers: [ThebridgeController],
  providers: [],
  exports: [TypeOrmModule]
})
export class ThebridgeModule {}
