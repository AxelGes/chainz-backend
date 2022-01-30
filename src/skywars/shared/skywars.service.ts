import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Skywars } from '../../entities/Skywars';

@Injectable()
export class SkywarsService {
	constructor(
		@InjectRepository(Skywars)
		private readonly skywarsRepository: Repository<Skywars>,
	) { }

	getById(id: number): Promise<Skywars> {
		return this.skywarsRepository.findOne(id);
	}

	getAll(): Promise<Skywars[]> {
		return this.skywarsRepository.find();
	}

	insert(skywars: Skywars): Promise<Skywars> {
		return this.skywarsRepository.save(skywars);
	}

	update(id: number, skywars: Skywars): Promise<UpdateResult> {
		return this.skywarsRepository.update(id, skywars);
	}

	delete(id: number): Promise<DeleteResult> {
		return this.skywarsRepository.delete(id);
	}
}