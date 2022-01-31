import {
    Controller,
    Get,
    Param,
    Body,
    Post,
    Put,
    Delete
  } from '@nestjs/common';
  import { Skywars } from '../entities/Skywars';
  import { UpdateResult, DeleteResult, InsertResult } from 'typeorm';
  
  @Controller('skywars')
  export class SkywarsController { 
  
    @Get()
    async getAll(): Promise<Skywars[]> {
      return Skywars.find();
    }
  
    @Get(':id')
    async getById(@Param('id') id: number): Promise<Skywars> {
      return Skywars.findOne(id);
    }
  
    @Post()
    async insert(@Body() skywars: Skywars): Promise<InsertResult> {
      return Skywars.insert(skywars);
    }
  
    @Put(':id')
    async update(
      @Param('id') id: number,
      @Body() skywars: Skywars
    ): Promise<UpdateResult> {
      return Skywars.update(id, skywars);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<DeleteResult> {
      return Skywars.delete(id);
    }
  }
  