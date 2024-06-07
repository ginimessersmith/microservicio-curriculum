import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Request } from "./request.entity";

@Entity({name:'validations'})
export class Validation{

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'int',
        nullable: false
    })
    score: number

    @Column({
        type: 'decimal',
        scale: 2,
        precision: 2,
        nullable: false
    })
    success_percentage: number

    @Column({
        type: 'text',
        nullable: false
    })
    opinion: string

    @OneToOne(
        () => Request,
        (req) => req.validation
    )
    @JoinColumn()
    request: Request;
}
