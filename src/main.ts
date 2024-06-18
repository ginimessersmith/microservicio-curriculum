import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('app')
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.setGlobalPrefix('api')
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted:true
    })
  )
  // const host = '192.168.0.25'
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  await app.listen(port,);
  // logger.log(`server in port: ${ +process.env.PORT}, host ${host}`)
  logger.log(`server in port: ${ +process.env.PORT}`)
}
bootstrap();
