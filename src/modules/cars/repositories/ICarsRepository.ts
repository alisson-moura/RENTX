import { I_CreateCarDTO } from '../dtos'
import { Car } from '../infra/typeorm/entities/Car'

interface I_Find {
    category_id?: string
    brand?: string
    name?: string
}

interface I_CarsRepository {
    create(data: I_CreateCarDTO): Promise<Car>
    findByLicensePlate(license_plate: string): Promise<Car>
    findAvailable(): Promise<Car[]>
    findAvailableAndFilter(data: I_Find): Promise<Car[]>
    findById(car_id: string): Promise<Car>
    updateAvailable(id: string, available: boolean): Promise<void>
}

export { I_CarsRepository, I_Find }