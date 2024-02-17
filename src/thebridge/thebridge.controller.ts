import { Controller, Get, Query } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Thebridge } from '../entities/Thebridge';
import { InjectRepository } from '@nestjs/typeorm';

interface ThebridgeRowExtended extends Thebridge {
  name: string;
}

interface ThebridgeRowsAndCountAllExtended {
  rows: ThebridgeRowExtended[];
  pageCount: number;
}

@Controller('thebridge')
export class ThebridgeController {
  constructor(
    @InjectRepository(Thebridge)
    private thebridgeRepository: Repository<Thebridge>
  ) { }

  @Get('/top')
  async getThebridgeTop(
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
    @Query('col') col: string = 'games_won'
  ): Promise<any> {
    const skip = (page - 1) * limit;

    // Using QueryBuilder to join Thebridge with PlayerProfile
    const queryBuilder = this.thebridgeRepository.createQueryBuilder('thebridge')
      .innerJoinAndSelect('thebridge.playerProfile', 'playerProfile')
      .orderBy(`thebridge.${col}`, 'DESC')
      .offset(skip)
      .limit(limit);

    const rows = await queryBuilder.getMany();

    const extendedRows = rows.map((row) => ({
      ...row,
      name: row.playerProfile.name,
    }));

    const count = await queryBuilder.getCount();
    const pageCount = Math.ceil(count / limit);

    return { rows: extendedRows, pageCount };
  }
}
