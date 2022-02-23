import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerModule } from './player/player.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entities/Player';
import { Skywars } from './entities/Skywars';
import { Thebridge } from './entities/Thebridge';
import { SkywarsModule } from './skywars/skywars.module';
import { ThebridgeModule } from './thebridge/thebridge.module';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot(
			{
				"type": process.env.TYPE as any,
				"host": process.env.DB_HOST,
				"port": Number(process.env.DB_PORT),
				"username": process.env.DB_USER,
				"password": process.env.DB_PASS,
				"database": process.env.DATABASE,
				"synchronize": process.env.SYNC == "true",
				"entities": [Player, Skywars, Thebridge]
			}
		),
		PlayerModule, SkywarsModule, ThebridgeModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
