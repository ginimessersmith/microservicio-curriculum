import {  IsString, IsUUID } from "class-validator";

export class CreateRequestDto{
    
    @IsUUID()
    campaignId: string;

    @IsString()
    emailPostulant: string

    @IsString()
    namePostulant: string

}