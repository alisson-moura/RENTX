import { inject, injectable } from "tsyringe"
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental"
import { I_RentalsRepository } from "@modules/rentals/repositories/IRentalsRepository"
import { I_DateProvider } from "@shared/container/providers/DateProvider/IDateProvider"
import { AppError } from "@shared/errors/AppError"
import { I_CarsRepository } from "@modules/cars/repositories/ICarsRepository"


interface I_Request {
    user_id: string
    car_id: string
    expected_return_date: Date
}

@injectable()
class CreateRentalUseCase {
    private rentalsRepository: I_RentalsRepository
    private carsRepository: I_CarsRepository
    private dateProvider: I_DateProvider


    constructor(
        @inject('RentalsRepository')
        rentalsRepository: I_RentalsRepository,

        @inject('DateProvider')
        dateProvider: I_DateProvider,

        @inject('CarsRepository')
        carsRepository: I_CarsRepository
    ) {
        this.rentalsRepository = rentalsRepository
        this.dateProvider = dateProvider
        this.carsRepository = carsRepository
    }

    public async execute({ user_id, car_id, expected_return_date }: I_Request): Promise<Rental> {
        const MINIMAL_TIME_RENT = 24

        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id)
        if (carUnavailable) {
            throw new AppError('Este carro está indisponivel!')
        }

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id)
        if (rentalOpenToUser) {
            throw new AppError('Já existe um aluguel em andamento para este usuário!')
        }

        const dateNow = this.dateProvider.dateNow()
        const compare = this.dateProvider.compareInHours(expected_return_date, dateNow)
        if (compare < MINIMAL_TIME_RENT) {
            throw new AppError('Invalid return time!')
        }

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date
        })

        await this.carsRepository.updateAvailable(car_id, false)

        return rental
    }
}

export { CreateRentalUseCase }