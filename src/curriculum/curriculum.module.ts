import { Module } from '@nestjs/common';
import { CurriculumService } from './curriculum.service';
import { CurriculumController } from './curriculum.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Campaign, CampaignSchema, Request, RequestSchema, Validation, ValidationSchema } from './entities';

@Module({
  controllers: [CurriculumController],
  providers: [CurriculumService],
  imports:[
    MongooseModule.forFeature([
      {
        name:Campaign.name,
        schema:CampaignSchema,
      },
      {
        name:Request.name,
        schema:RequestSchema,
      },
      {
        name:Validation.name,
        schema:ValidationSchema,
      },
    ])
  ]
})
export class CurriculumModule {}
