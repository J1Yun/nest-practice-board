import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  const serverconfig = config.get('server');
  const port = serverconfig.port;
  await app.listen(port);
  logger.log(`Application running on port ${port}`);
}
bootstrap();
