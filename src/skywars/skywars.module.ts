import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skywars } from '../entities/Skywars';
import { SkywarsController } from './skywars.controller';
import { SkywarsService } from './shared/skywars.service';

@Module({
  imports: [TypeOrmModule.forFeature([Skywars])],
  controllers: [SkywarsController],
  providers: [SkywarsService],
  exports: [TypeOrmModule]
})
export class SkywarsModule {}
