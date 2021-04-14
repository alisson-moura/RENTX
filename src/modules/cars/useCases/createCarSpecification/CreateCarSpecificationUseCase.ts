import { inject, injectable } from "tsyringe"
import { Car } from "@modules/cars/infra/typeorm/entities/Car"
import { I_CarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository"
import { AppError } from "@shared/errors/AppError"


interface I_Request {
    car_id: string
    specifications_id: string[]
}

@injectable()
class CreateCarSpecificationUseCase {

    private carsRepository: I_CarsRepository
    private specificationRepository: ISpecificationsRepository

    constructor(
        @inject('CarsRepository')
        carsRepository: I_CarsRepository,

        @inject('SpecificationsRepository')
        specificationRepository: ISpecificationsRepository
    ) {
        this.carsRepository = carsRepository
        this.specificationRepository = specificationRepository
    }

    public async execute({ car_id, specifications_id }: I_Request): Promise<Car> {
        const carExists = await this.carsRepository.findById(car_id)

        if (!carExists) throw new AppError('Carro informado não está disponivel')

        const specifications = await this.specificationRepository.findByIds(specifications_id)

        carExists.specifications = specifications
        await this.carsRepository.create(carExists)
        return carExists
    }
}

export { CreateCarSpecificationUseCase }