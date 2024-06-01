import { Module } from '@nestjs/common';
import { CurriculumModule } from './curriculum/curriculum.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    CurriculumModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/curriculum')
  ],
})
export class AppModule { }
