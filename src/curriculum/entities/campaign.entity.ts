import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema()
export class Campaign extends Document {

    @Prop({
        unique: true,
        index: true,
        required:true,
    })
    idEnterprise: number

    @Prop({
        required: true,
    })
    name: string

    @Prop({
        required: true
    })
    description: string

    @Prop({
        required: true
    })
    parameters: string
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign)