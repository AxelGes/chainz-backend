import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Player } from '../../entities/Player';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>
  ) {}

  getById(id: number): Promise<Player> {
    return this.playerRepository.findOne(id);
  }

  getAll(): Promise<Player[]> {
    return this.playerRepository.find();
  }

  insert(player: Player): Promise<Player> {
    return this.playerRepository.save(player);
  }

  update(id: number, player: Player): Promise<UpdateResult> {
    return this.playerRepository.update(id, player);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.playerRepository.delete(id);
  }
}
