import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export class Validation extends Document {

    @Prop({
        required: true
    })
    score: number

    @Prop({
        required: true
    })
    success_percentage: number

    @Prop({
        required: true
    })
    opinion: string

    @Prop({
        type: Types.ObjectId,
        ref: 'Request',
        unique: true,
        required: true
    })
    request: Request;
}

export const ValidationSchema = SchemaFactory.createForClass(Validation)