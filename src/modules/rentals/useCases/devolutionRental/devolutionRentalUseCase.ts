import { I_CarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental"
import { I_RentalsRepository } from "@modules/rentals/repositories/IRentalsRepository"
import { I_DateProvider } from "@shared/container/providers/DateProvider/IDateProvider"
import { AppError } from "@shared/errors/AppError"
import { inject, injectable } from "tsyringe"

interface I_Request {
    rental_id: string
    user_id: string
}

@injectable()
class DevolutionRentalUseCase {
    private rentalsRepository: I_RentalsRepository
    private carsRepository: I_CarsRepository
    private dateProvider: I_DateProvider

    constructor(
        @inject('CarsRepository')
        carsRepository: I_CarsRepository,
        @inject('RentalsRepository')
        rentalsRepository: I_RentalsRepository,
        @inject('DateProvider')
        dateProvider: I_DateProvider
    ) {
        this.carsRepository = carsRepository
        this.rentalsRepository = rentalsRepository
        this.dateProvider = dateProvider
    }

    async execute({ rental_id, user_id }: I_Request): Promise<Rental> {
        const minimum_daily = 1
        let total = 0

        const rental = await this.rentalsRepository.findById(rental_id)
        const car = await this.carsRepository.findById(rental.car_id)
        if (!rental) {
            throw new AppError('Aluguel não encontrado.')
        }

        let daily = this.dateProvider.compareInDays(this.dateProvider.dateNow(), rental.expected_return_date)
        if (daily <= 0) {
            daily = minimum_daily
        }

        const delay = this.dateProvider.compareInHours(this.dateProvider.dateNow(), rental.expected_return_date)
        if (delay > 0) {
            const calculate_fine = delay * car.fine_amount
            total = calculate_fine
        }

        total = total + (daily * car.daily_rate)

        rental.end_date = this.dateProvider.dateNow()
        rental.total = total

        await this.rentalsRepository.create(rental)
        await this.carsRepository.updateAvailable(car.id, true)

        return rental
    }
}

export { DevolutionRentalUseCase }