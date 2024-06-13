import { Injectable, InternalServerErrorException, Logger, NotFoundException, UnsupportedMediaTypeException } from '@nestjs/common';
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
import { getHeapSnapshot } from 'v8';

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
            let extractTextPdf: pdfParse.Result
            let extractTextWord: string
            const supportedTypes = [
                'application/pdf',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/octet-stream'
            ];

            if (!supportedTypes.includes(curriculum.mimetype)) {
                throw new UnsupportedMediaTypeException('Unsupported file type');
            }

            // Ajustar tipo MIME si es necesario
            if (curriculum.mimetype === 'application/octet-stream' && curriculum.originalname.endsWith('.pdf')) {
                curriculum.mimetype = 'application/pdf';
            }

            console.log({ curriculum })
            if (curriculum.mimetype === 'application/pdf') {
                extractTextPdf = await this.extractTextFromPDF(curriculumBuffer);
            } else if (curriculum.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                extractTextWord = await this.extractTextFromWord(curriculumBuffer);
            } else {
                throw new Error('Unsupported file type');
            }

            if (curriculum) {
                cloud = await this.cloudinaryService.uploadFile(curriculum)
            }
            const campaign = await this.findOneCampaign(createRequestDto.campaignId)

            const request = this.requestRepository.create({
                ...createRequestDto,
                curriculumVitae: cloud.secure_url,
                campaign
            })
            const savedRequest = await this.requestRepository.save(request)

            const { description, parameters } = campaign

            const checkCurriculumDto: CheckCurriculumDto = {
                prompt: extractTextPdf.text,
                description,
                parameters,
            }

            const evaluate = await this.evaluateCurriculum(checkCurriculumDto)
            const validation = this.validationRepository.create({
                ...evaluate,
                request: savedRequest
            })
            console.log({validation})
            await this.validationRepository.save(validation)
            return { ...validation }

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
        } catch (error) {
            this.logger.error('Failed to extract text from PDF document', error.stack);
            throw new Error('Failed to process PDF file');
        }
    }

    private async extractTextFromWord(buffer: Buffer): Promise<string> {
        const { value } = await mammoth.extractRawText({ buffer });
        return value;
    }

    async findOneCampaign(id: string) {
        try {
            console.log(id)
            const campaign = await this.campaignRepository.findOne({
                where: { id }
            })

            if (!campaign) throw new NotFoundException('not found campaign')
            return campaign
        } catch (error) {
            handleError(error)
        }

    }

    async findOneRequest(id: string) {
        try {
            console.log(id)

            const request = await this.requestRepository.findOne({
                where: { id },
                
            })

            if (!request) throw new NotFoundException('not found request')
            return request
        } catch (error) {
            handleError(error)
        }
    }

    async findOneValidation(id: string) {
        try {
            const validation = await this.validationRepository.findOne({
                where: { id }
            })
            if (!validation) throw new NotFoundException('the validation not found')
            return validation
        } catch (error) {
            handleError(error)
        }
    }

    async findAllRequest() {
        try {
            return await this.requestRepository.find({
                relations:['validation']
            })
        } catch (error) {
            handleError(error)
        }
    }

    async findAllValidations() {
        try {
            return await this.validationRepository.find()
        } catch (error) {
            handleError(error)
        }
    }

    async findAllCampaign() {
        try {
            return await this.campaignRepository.find()
        } catch (error) {
            handleError(error)
        }
    }


}


