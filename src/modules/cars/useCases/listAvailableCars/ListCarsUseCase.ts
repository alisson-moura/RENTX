import { Car } from "@modules/cars/infra/typeorm/entities/Car"
import { I_CarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { inject, injectable } from "tsyringe"

interface I_Request {
    category_id?: string
    brand?: string
    name?: string
}

@injectable()
class ListCarsUseCase {
    private carsRepository: I_CarsRepository


    constructor(
        @inject('CarsRepository')
        carsRepository: I_CarsRepository
    ) {
        this.carsRepository = carsRepository
    }
    
    public async execute({ brand, category_id, name }: I_Request): Promise<Car[]> {
        let cars: Car[]
        if (brand || category_id || name)
            return cars = await this.carsRepository.findAvailableAndFilter({ name, brand, category_id })

        return cars = await this.carsRepository.findAvailable()
    }
}

export { ListCarsUseCase }