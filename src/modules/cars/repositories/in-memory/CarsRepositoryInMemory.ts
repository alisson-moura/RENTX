import { I_CreateCarDTO } from '@modules/cars/dtos'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { I_CarsRepository } from '../ICarsRepository'

class CarsRepositoryInMemory implements I_CarsRepository {
    private cars: Car[] = []

    public async updateAvailable(id: string, available: boolean): Promise<void> {
        const findIndex = await this.cars.findIndex((car) => car.id === id)
        this.cars[findIndex].available = available
    }

    async create(data: I_CreateCarDTO): Promise<Car> {
        const car = new Car()
        Object.assign(car, data)
        this.cars.push(car)

        return car
    }

    public async findById(car_id: string): Promise<Car> {
        return this.cars.find((car) => car.id === car_id)
    }


    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = this.cars.find(car => car.license_plate === license_plate)
        return car
    }

    async findAvailable(): Promise<Car[]> {
        let carsAvailable = this.cars.filter((car) => car.available === true)
        return carsAvailable
    }

    async findAvailableAndFilter({ name, category_id, brand }): Promise<Car[]> {
        const carsAvailable = this.cars.filter((car) => {
            if (car.available === true && (
                car.brand == brand || car.name == name || car.category_id == category_id
            )) {
                return car
            }
            return null
        })
        return carsAvailable
    }

}

export { CarsRepositoryInMemory }