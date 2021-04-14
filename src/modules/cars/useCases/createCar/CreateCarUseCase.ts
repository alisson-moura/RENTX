import { inject, injectable } from "tsyringe";
import { I_CreateCarDTO } from "@modules/cars/dtos";
import { I_CarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

@injectable()
class CreateCarUseCase {

    private carsRepository: I_CarsRepository

    constructor(
         @inject('CarsRepository')
        carsRepository: I_CarsRepository
    ) {
        this.carsRepository = carsRepository
    }

    public async execute({ name, brand, category_id, daily_rate, description, fine_amount, license_plate }: I_CreateCarDTO): Promise<Car> {
        const carAlredyExists = await this.carsRepository.findByLicensePlate(license_plate);
        if (carAlredyExists)
            throw new AppError('Carro já existe!')

        const car = await this.carsRepository.create({
            brand,
            category_id,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            name
        })

        return car
    }

}
export { CreateCarUseCase }