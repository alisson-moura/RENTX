import 'reflect-metadata'
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory"
import { I_RentalsRepository } from "@modules/rentals/repositories/IRentalsRepository"
import { I_DateProvider } from "@shared/container/providers/DateProvider/IDateProvider"
import { DayjsProvider } from "@shared/container/providers/DateProvider/implementations/DayjsProvider"
import { AppError } from "@shared/errors/AppError"
import dayjs from "dayjs"
import { CreateRentalUseCase } from "./CreateRentalUseCase"

let createRentalUseCase: CreateRentalUseCase
let rentalsRepository: I_RentalsRepository
let dateProvider: I_DateProvider

describe("Create Rental", () => {
    const dayAdd24Hours = dayjs().add(1, 'day').toDate()
    beforeEach(() => {
        rentalsRepository = new RentalsRepositoryInMemory()
        dateProvider = new DayjsProvider()
        createRentalUseCase = new CreateRentalUseCase(rentalsRepository, dateProvider)
    })

    it('should be able to create a new rental', async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "123",
            car_id: '123',
            expected_return_date: dayAdd24Hours
        })

        expect(rental).toHaveProperty('id')
        expect(rental).toHaveProperty('start_date')
    })

    it('should not be able to create a new rental if there is another open to the same user', async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "123",
            car_id: '123',
            expected_return_date: dayAdd24Hours
        })

        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "123",
                car_id: '123',
                expected_return_date: dayAdd24Hours
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to create a new rental if there is another open to the same car', async () => {
        await createRentalUseCase.execute({
            user_id: "124",
            car_id: '123',
            expected_return_date: dayAdd24Hours
        })

        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "123",
                car_id: '123',
                expected_return_date: dayAdd24Hours
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to create a new rental with invalid', async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "123",
                car_id: '123',
                expected_return_date: dayjs().toDate()
            })
        }).rejects.toBeInstanceOf(AppError)
    })


})