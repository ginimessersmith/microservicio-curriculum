import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Campaign } from "./campaign.entity";
import { Validation } from "./validation.entity";

@Schema()
export class Request extends Document {

    @Prop({
        type: Types.ObjectId,
        ref: 'Campaign',
        required: true
    })
    campaign: Campaign;

    @Prop({
        required: true,
        unique: true
    })
    emailPostulant: string

    @Prop({
        required: true,
    })
    namePostulant: string

    @Prop({
        required: true
    })
    curriculumVitae: string

    @Prop({
        type: Types.ObjectId,
        ref: 'Validation'
    })
    validation: Validation;
}

export const RequestSchema = SchemaFactory.createForClass(Request)