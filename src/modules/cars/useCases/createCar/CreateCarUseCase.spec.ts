import 'reflect-metadata'
import { CreateCarUseCase } from './CreateCarUseCase'
import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory'
import { I_CreateCarDTO } from '@modules/cars/dtos'
import { I_CarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { AppError } from '@shared/errors/AppError'

const makeCars = () => {
    const validCar: I_CreateCarDTO = {
        brand: 'Valid Brand',
        name: 'Valid car name',
        license_plate: 'ABC-1234',
        fine_amount: 60,
        daily_rate: 100,
        description: 'Valid Description',
        category_id: 'valid uuid'
    }

    return { validCar }
}


let carsReposiotoryInMemory: I_CarsRepository
let createCarUseCase: CreateCarUseCase

describe('Create Car', () => {
    beforeEach(() => {
        carsReposiotoryInMemory = new CarsRepositoryInMemory()
        createCarUseCase = new CreateCarUseCase(carsReposiotoryInMemory)
    })

    it('should be able to create a new car', async () => {
        const { validCar } = makeCars()
        const car = await createCarUseCase.execute(validCar)
        expect(car).toHaveProperty("id")
    })

    it('should not be able to create a car with exists license plate', async () => {
        const { validCar } = makeCars()
        await createCarUseCase.execute(validCar)

        await expect(createCarUseCase.execute(validCar)
        ).rejects.toEqual(new AppError('Carro já existe!'))
    })

    it('should be able to create a new car with available true by default', async () => {
        const { validCar } = makeCars()
        const car = await createCarUseCase.execute(validCar)
        expect(car.available).toBe(true)
    })

})