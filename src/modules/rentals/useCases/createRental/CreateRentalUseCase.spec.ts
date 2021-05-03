import 'reflect-metadata'
import { v4 as uuid } from 'uuid'

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory"
import { I_RentalsRepository } from "@modules/rentals/repositories/IRentalsRepository"
import { I_DateProvider } from "@shared/container/providers/DateProvider/IDateProvider"
import { DayjsProvider } from "@shared/container/providers/DateProvider/implementations/DayjsProvider"
import { AppError } from "@shared/errors/AppError"
import dayjs from "dayjs"
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { I_CarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'

let createRentalUseCase: CreateRentalUseCase
let rentalsRepository: I_RentalsRepository
let dateProvider: I_DateProvider
let carsRepository: I_CarsRepository
let valid_car: Car
let valid_car_2: Car

describe("Create Rental", () => {
    const dayAdd24Hours = dayjs().add(1, 'day').toDate()
    beforeEach(async () => {
        rentalsRepository = new RentalsRepositoryInMemory()
        dateProvider = new DayjsProvider()
        carsRepository = new CarsRepositoryInMemory()
        createRentalUseCase = new CreateRentalUseCase(rentalsRepository, dateProvider, carsRepository)

        valid_car = await carsRepository.create({
            brand: 'Fiat',
            category_id: '123',
            daily_rate: 100,
            description: 'A nice Car',
            fine_amount: 25,
            license_plate: 'xxx-xxx',
            name: 'Uno 2001',
        })

        valid_car_2 = await carsRepository.create({
            brand: 'Fiat',
            category_id: '123',
            daily_rate: 100,
            description: 'A nice Car',
            fine_amount: 25,
            license_plate: 'xxx-xxxx',
            name: 'Uno 2001',
        })

    })

    it('should be able to create a new rental', async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "123",
            car_id: valid_car.id,
            expected_return_date: dayAdd24Hours
        })

        expect(rental).toHaveProperty('id')
        expect(rental).toHaveProperty('start_date')
    })

    it('should not be able to create a new rental if there is another open to the same user', async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "123",
            car_id: valid_car.id,
            expected_return_date: dayAdd24Hours
        })

        await expect(createRentalUseCase.execute({
            user_id: "123",
            car_id: valid_car_2.id,
            expected_return_date: dayAdd24Hours
        })
        ).rejects.toEqual(new AppError('Já existe um aluguel em andamento para este usuário!'))
    })

    it('should not be able to create a new rental if there is another open to the same car', async () => {
        await createRentalUseCase.execute({
            user_id: "124",
            car_id: valid_car.id,
            expected_return_date: dayAdd24Hours
        })

        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "123",
                car_id: valid_car.id,
                expected_return_date: dayAdd24Hours
            })
        }).rejects.toEqual(new AppError('Este carro está indisponivel!'))
    })

    it('should not be able to create a new rental with invalid date', async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "123",
                car_id: '123',
                expected_return_date: dayjs().toDate()
            })
        }).rejects.toEqual(new AppError('Invalid return time!'))
    })


})