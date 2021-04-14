import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity("users")
class User {
    @PrimaryColumn('uuid')
    id: string

    @Column('varchar')
    name: string

    @Column('varchar')
    email: string

    @Column('varchar')
    password: string

    @Column('varchar')
    avatar?: string

    @Column('boolean')
    isAdmin: boolean

    @Column('varchar')
    driver_license: string

    @CreateDateColumn()
    created_at: Date


    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }

}
export { User }