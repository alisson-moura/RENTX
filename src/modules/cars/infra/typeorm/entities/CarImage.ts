import { v4 as uuid } from 'uuid'
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm'
import { Category } from './Category'
import { Specification } from './Specification'
import { Car } from './Car'

@Entity("cars_image")
class CarImage {
    @PrimaryColumn("uuid")
    id?: string

    @Column()
    image_name: string

    @Column()
    car_id: string

    @CreateDateColumn()
    created_at?: Date

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }
}
export { CarImage }