import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CurriculumService } from './curriculum.service';
import { CheckCurriculumDto } from './dto/check-curriculum.dto';


@Controller('curriculum')
export class CurriculumController {
  constructor(private readonly curriculumService: CurriculumService) { }

  @Post()
  create() {
    return this.curriculumService.create()
  }

  @Post('evaluate')
  evaluateCurriculum(
    @Body() checkCurriculumDto: CheckCurriculumDto
  ) {
    return this.curriculumService.evaluateCurriculum(checkCurriculumDto)
  }
}
