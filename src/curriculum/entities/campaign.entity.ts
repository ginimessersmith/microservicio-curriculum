import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Request } from './request.entity';

@Entity({ name: 'campaigns' })
export class Campaign {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'uuid',
        nullable: false
    })
    idEnterprise: string

    @Column({
        type: 'text',
        nullable: false
    })
    name: string

    @Column({
        type: 'text',
        nullable: false
    })
    nameEnterprise: string

    @Column({
        type: 'text',
        nullable: false
    })  
    description: string

    @Column({
        type: 'text',
        nullable: false
    })
    parameters: string

    @OneToMany(
        () => Request,
        (req)=>req.campaign,
        {
            eager:true,
            cascade:true
        }
    )
    request: Request[]
}