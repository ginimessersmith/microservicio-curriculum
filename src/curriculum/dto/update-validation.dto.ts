import { PartialType } from "@nestjs/mapped-types";
import { CreateValidationDto } from "./create-validation.dto";

export class UpdateValidationDto extends PartialType(CreateValidationDto) { }