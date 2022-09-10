import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';

import { AppModule } from './app.module';

const crPath = '/etc/letsencrypt/live/mechabrawlers.online/fullchain.pem';
const pkPath = '/etc/letsencrypt/live/mechabrawlers.online/privkey.pem';

const options: any = {};

if (fs.existsSync(crPath) && fs.existsSync(pkPath)) {
  options.httpsOptions = {
    cert: fs.readFileSync(crPath),
    key: fs.readFileSync(pkPath)
  }
}

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server), { cors: true });

  await app.init();

  http.createServer(server).listen(8080);
  https.createServer(options, server).listen(8443);
}

bootstrap();
