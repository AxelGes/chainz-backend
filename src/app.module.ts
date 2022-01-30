import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerModule } from './player/player.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entities/Player';
import { Skywars } from './entities/Skywars';
import { SkywarsModule } from './skywars/skywars.module';

@Module({
	imports: [
		TypeOrmModule.forRoot(
			{
				"type": "mysql",
				"host": "localhost",
				"port": 3306,
				"username": "root",
				"password": "",
				"database": "test",
				"synchronize": true,
				"entities": [Player, Skywars]
			}
		),
		PlayerModule, SkywarsModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
