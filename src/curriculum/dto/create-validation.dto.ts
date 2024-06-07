import { IsInt, IsNumberString, IsString, IsUUID } from "class-validator";

export class CreateValidationDto {
    @IsInt()
    score: number

    @IsNumberString()
    success_percentage: number

    @IsString()
    opinion: string

    @IsUUID()
    requestId: string;
}