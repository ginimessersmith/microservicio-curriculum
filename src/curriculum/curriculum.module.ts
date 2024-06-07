import { Module } from '@nestjs/common';
import { CurriculumService } from './curriculum.service';
import { CurriculumController } from './curriculum.controller';


import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campaign, Request, Validation } from './entities';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  controllers: [CurriculumController],
  providers: [CurriculumService],
  imports:[
    ConfigModule,
    CloudinaryModule,
    TypeOrmModule.forFeature([
      Campaign,
      Request,
      Validation
    ])
  ]
})
export class CurriculumModule {}
