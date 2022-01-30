import { Controller, Get, Param, Body, Post, Put, Delete } from '@nestjs/common';
import { Skywars } from '../entities/Skywars';
import { SkywarsService } from './shared/skywars.service';
import { UpdateResult, DeleteResult } from 'typeorm';

@Controller('skywars')
export class SkywarsController {

    constructor(
        private skywarsService: SkywarsService
    ) { }

    @Get()
    async getAll() : Promise<Skywars[]> {
        return this.skywarsService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id : number) : Promise<Skywars> {
        return this.skywarsService.getById(id);
    }

    @Post()
    async insert(@Body() skywars : Skywars) : Promise<Skywars> {
        return this.skywarsService.insert(skywars);
    }
    
    @Put(':id')
    async update(@Param('id') id : number, @Body() skywars : Skywars) : Promise<UpdateResult> {
        return this.skywarsService.update(id, skywars);
    }

    @Delete(':id')
    async delete(@Param('id') id : number) : Promise<DeleteResult> {
        return this.skywarsService.delete(id);
    }

}
