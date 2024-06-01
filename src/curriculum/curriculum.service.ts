import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { CheckCurriculumDto } from './dto/check-curriculum.dto';
import { check_curriculum } from './use-cases/check-curriculum.dto';


@Injectable()
export class CurriculumService {

    private logger = new Logger('Curriculum Service')
    private openAI = new OpenAI({
        apiKey: this.configService.get('API_OPENAI')
    })

    constructor(
        private configService: ConfigService
    ) { }

    create() {
        return 'this create'
    }

    async evaluateCurriculum(checkCurriculum: CheckCurriculumDto) {
        this.logger.log('evaluate Curriculum execute')
        return await check_curriculum(this.openAI, checkCurriculum)
    }
}
