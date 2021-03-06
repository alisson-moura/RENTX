import { v4 as uuid } from 'uuid'
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm'
import { Category } from './Category'
import { Specification } from './Specification'

@Entity("cars")
class Car {
    @PrimaryColumn("uuid")
    id?: string

    @Column()
    name: string

    @Column()
    description: string

    @Column('float')
    daily_rate: number

    @Column()
    available?: boolean = true

    @Column()
    license_plate: string

    @Column('float')
    fine_amount: number

    @Column()
    brand: string

    @ManyToOne(() => Category)
    @JoinColumn({ name: "category_id" })
    category: Category

    @ManyToMany(() => Specification)
    @JoinTable({
        name: 'specifications_cars',
        joinColumns: [{ name: 'car_id' }],
        inverseJoinColumns: [{ name: 'specification_id' }]
    })
    specifications: Specification[]

    @Column()
    category_id: string

    @CreateDateColumn()
    created_at?: Date

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }
}
export { Car }