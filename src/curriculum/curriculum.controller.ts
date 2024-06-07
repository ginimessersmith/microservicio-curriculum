import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Logger } from '@nestjs/common';
import { CurriculumService } from './curriculum.service';
import { CheckCurriculumDto } from './dto/check-curriculum.dto';
import { CreateCampaignDto, CreateRequestDto, CreateValidationDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('curriculum')
export class CurriculumController {
  private logger = new Logger('curriculum controller')
  constructor(private readonly curriculumService: CurriculumService) { }

  @Post('create-campaign')
  createCampaign(
    @Body() CreateCampaignDto: CreateCampaignDto
  ) {
    return this.curriculumService.createCampaign(CreateCampaignDto)
  }

  @Post('create-request')
  @UseInterceptors(FileInterceptor('curriculumVitae'))
  createRequest(
    @Body() CreateRequestDto: CreateRequestDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.curriculumService.createRequest(CreateRequestDto, file)
  }

  @Post('create-validation')
  createValidation(
    @Body() CreateValidationDto: CreateValidationDto
  ) {
    return this.curriculumService.createValidation(CreateValidationDto)
  }

  @Post('evaluate')
  evaluateCurriculum(
    @Body() checkCurriculumDto: CheckCurriculumDto
  ) {
    return this.curriculumService.evaluateCurriculum(checkCurriculumDto)
  }

  @Get('find-all-campaign')
  findAllCampaign(){
    this.logger.log('find all campaign execute')
    return this.curriculumService.findAllCampaign()
  }
}
