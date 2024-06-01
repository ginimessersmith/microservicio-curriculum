import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('app')
  const app = await NestFactory.create(AppModule);
  await app.listen(+process.env.PORT);
  logger.log(`server in port: ${ +process.env.PORT}`)
}
bootstrap();
