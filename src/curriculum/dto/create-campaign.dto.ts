import { IsInt, IsString, IsUUID } from "class-validator"

export class CreateCampaignDto {
    
    @IsUUID()
    idEnterprise: string

    @IsString()
    name: string

    @IsString()
    nameEnterprise: string

    @IsString()
    description: string

    @IsString()
    parameters: string
}