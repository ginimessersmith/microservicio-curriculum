import { IsInt, IsOptional, IsString } from "class-validator"

export class CheckCurriculumDto {

    @IsString()
    prompt: string

    @IsString()
    description: string

    @IsString()
    parameters: string

    @IsInt()
    @IsOptional()
    maxToekns: number
}
