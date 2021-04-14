import { getRepository, Repository } from 'typeorm'
import { Car } from '../entities/Car'
import { I_CarsRepository, I_Find } from '@modules/cars/repositories/ICarsRepository'
import { I_CreateCarDTO } from '@modules/cars/dtos'


class CarsRepository implements I_CarsRepository {
    private repository: Repository<Car>

    constructor() {
        this.repository = getRepository(Car)
    }

    public async findById(car_id: string): Promise<Car> {
       const car = await this.repository.findOne({id: car_id})
       return car
    }

    public async findAvailable(): Promise<Car[]> {
        const cars = await this.repository.createQueryBuilder("c")
            .where("available = :available", { available: true }).getMany()
        return cars
    }

    public async findAvailableAndFilter({ brand, name, category_id }: I_Find): Promise<Car[]> {
        const carsQuery = this.repository.createQueryBuilder("c")
            .where("available = :available", { available: true })
        if (brand) {
            carsQuery.andWhere('c.brand = :brand', { brand })
        }
        if (name) {
            carsQuery.andWhere('c.name = :name', { name })
        }
        if (category_id) {
            carsQuery.andWhere('c.category_id = :category_id', { category_id })
        }
        const cars = await carsQuery.getMany()
        return cars
    }

    public async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({
            license_plate
        })
        return car
    }

    public async create(data: I_CreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            name: data.name,
            description: data.description,
            brand: data.brand,
            license_plate: data.license_plate,
            category_id: data.category_id,
            daily_rate: data.daily_rate,
            fine_amount: data.fine_amount,
            specifications: data.specifications,
            id: data.id
        })
        await this.repository.save(car)

        return car
    }
}

export { CarsRepository }