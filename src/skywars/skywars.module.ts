import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skywars } from '../entities/Skywars';
import { SkywarsController } from './skywars.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Skywars])],
  controllers: [SkywarsController],
  providers: [],
  exports: [TypeOrmModule]
})
export class SkywarsModule {}
