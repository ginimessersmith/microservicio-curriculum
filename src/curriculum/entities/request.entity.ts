
import { Campaign } from "./campaign.entity";
import { Validation } from './validation.entity';
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'requests' })
export class Request {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'text',
        nullable: false
    })
    emailPostulant: string

    @Column({
        type: 'text',
        nullable: false
    })
    namePostulant: string

    @Column({
        type: 'text',
        nullable: false
    })
    curriculumVitae: string

    @ManyToOne(
        () => Campaign,
        (cam) => cam.request,
        {
            onDelete: 'CASCADE'
        }
    )
    campaign: Campaign;

    @OneToOne(
        ()=>Validation,
        (val)=>val.request
    )
    validation:Validation
}
