import { I_CreateCarDTO } from "@modules/cars/dtos"
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository"
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationRepositoryInMemory: SpecificationRepositoryInMemory

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

const makeSpecificatiosn = () => {
    const specification01 = {
        description: "valid specification for tests",
        name: 'Valid Specification 01'
    }
    const specification02 = {
        description: "valid specification for tests",
        name: 'Valid Specification 02'
    }
    const specification03 = {
        description: "valid specification for tests",
        name: 'Valid Specification 03'
    }
    return { specification01, specification02, specification03 }
}


describe('Create Car Specification', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        specificationRepositoryInMemory = new SpecificationRepositoryInMemory()
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationRepositoryInMemory
        )
    })

    it("should not be able to add a new specification to a now-existent car", async () => {
        const car_id = "123"
            const specifications_id = ["54321"]
        await expect(createCarSpecificationUseCase.execute({ car_id, specifications_id })
        ).rejects.toEqual(new AppError('Carro informado não está disponivel'))

    })

    it("should be able to add a new specification to the car", async () => {
        const { validCar } = makeCars()
        const { specification01, specification02, specification03 } = makeSpecificatiosn()
        const car = await carsRepositoryInMemory.create(validCar)
        const specification1 = await specificationRepositoryInMemory.create(specification01)
        const specification2 = await specificationRepositoryInMemory.create(specification02)
        const specification3 = await specificationRepositoryInMemory.create(specification03)
        const specificationsCars =  await createCarSpecificationUseCase.execute({ car_id: car.id, specifications_id: [specification1.id, specification2.id, specification3.id] })
        expect(specificationsCars).toHaveProperty('specifications')
        expect(specificationsCars.specifications.length).toBe(3)
    })

})