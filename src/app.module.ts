import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerModule } from './player/player.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entities/Player';
import { Skywars } from './entities/Skywars';
import { Thebridge } from './entities/Thebridge';

@Module({
	imports: [
		TypeOrmModule.forRoot(
			{
				"type": "postgres",
				"host": "localhost",
				"port": 5432,
				"username": "postgres",
				"password": "postgres",
				"database": "chainz2",
				"synchronize": true,
				"entities": [Player, Skywars, Thebridge]
			}
		),
		PlayerModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
