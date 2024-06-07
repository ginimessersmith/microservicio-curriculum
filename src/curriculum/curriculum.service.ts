import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI, { InternalServerError } from 'openai';
import { CheckCurriculumDto } from './dto/check-curriculum.dto';
import { check_curriculum } from './use-cases/check-curriculum.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Campaign, Request, Validation } from './entities';
import { Model } from 'mongoose';
import { CreateCampaignDto, CreateValidationDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRequestDto } from './dto/create-request.dto';
import { handleError } from 'src/helpers/functions';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CloudinaryResponse } from 'src/cloudinary/cloudinary-response';
import * as mammoth from 'mammoth';
import * as pdfParse from 'pdf-parse';






@Injectable()
export class CurriculumService {
    private logger = new Logger('Curriculum Service')
    private openAI = new OpenAI({
        apiKey: this.configService.get('API_OPENAI')
    })

    constructor(
        private configService: ConfigService,

        @InjectRepository(Campaign)
        private campaignRepository: Repository<Campaign>,

        @InjectRepository(Request)
        private requestRepository: Repository<Request>,

        @InjectRepository(Validation)
        private validationRepository: Repository<Validation>,

        private cloudinaryService: CloudinaryService

    ) { }

    async createCampaign(createCampaignDto: CreateCampaignDto) {
        try {

            const campaign = this.campaignRepository.create({
                ...createCampaignDto
            })
            await this.campaignRepository.save(campaign)
            return campaign

        } catch (error) {
            handleError(error)
        }
    }

    async createRequest(createRequestDto: CreateRequestDto, curriculum: Express.Multer.File,) {
        try {

            let cloud: CloudinaryResponse
            const curriculumBuffer = curriculum.buffer
            let text
            console.log({ curriculum })
            if (curriculum.mimetype === 'application/pdf') {
                text = await this.extractTextFromPDF(curriculumBuffer);
            } else if (curriculum.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                text = await this.extractTextFromWord(curriculumBuffer);
            } else {
                throw new Error('Unsupported file type');
            }
            if (curriculum) {
                // cloud = await this.cloudinaryService.uploadFile(curriculum)
            }
            // const request = this.requestRepository.create({
            //     ...createRequestDto,
            //     curriculumVitae: cloud.secure_url
            // })
            return text

        } catch (error) {
            handleError(error)
        }
    }

    async createValidation(createValidationDto: CreateValidationDto) {
        return createValidationDto
    }

    async evaluateCurriculum(checkCurriculum: CheckCurriculumDto) {
        this.logger.log('evaluate Curriculum execute')
        return await check_curriculum(this.openAI, checkCurriculum)
    }

    private async extractTextFromPDF(buffer: Buffer): Promise<pdfParse.Result> {
        try {

            return await pdfParse(buffer);
            // return data.text;
        } catch (error) {
            this.logger.error('Failed to extract text from PDF document', error.stack);
            throw new Error('Failed to process PDF file');
        }
    }

    private async extractTextFromWord(buffer: Buffer): Promise<string> {
        const { value } = await mammoth.extractRawText({ buffer });
        return value;
    }

    async findAllCampaign(){
        return await this.campaignRepository.find()
    }
}


