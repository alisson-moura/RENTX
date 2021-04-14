import { I_CarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { ListCarsUseCase } from "./ListCarsUseCase"

let listCarsUseCase: ListCarsUseCase
let carsRepository: I_CarsRepository

const makeCars = () => {
    const car1 = {
        brand: "Volkswagem",
        category_id: "43eba87f-d9af-4d68-99da-8f1ca22db275",
        daily_rate: 144.00,
        description: "Um bom carro para passeio",
        fine_amount: 100,
        license_plate: "DEF-1213",
        name: "Car-01",
        available: true
    }
    const car2 = {
        brand: "Gol",
        category_id: "43eba87f-d9af-4d68-99da-8f1ca22db274",
        daily_rate: 144.00,
        description: "Um bom carro para passeio",
        fine_amount: 100,
        license_plate: "DEF-1213",
        name: "Car-02",
        available: false
    }
    const car3 = {
        brand: "Chevrolet",
        category_id: "43eba87f-d9af-4d68-99da-8f1ca22db271",
        daily_rate: 144.00,
        description: "Um bom carro para passeio",
        fine_amount: 100,
        license_plate: "DEF-1213",
        name: "Car-03",
        available: true
    }
    return { car1, car2, car3 }
}

const { car1, car2, car3 } = makeCars()

describe('List Cars', () => {

    beforeEach(async () => {
        carsRepository = new CarsRepositoryInMemory()
        listCarsUseCase = new ListCarsUseCase(carsRepository)
    })

    it('should be able list all availables cars', async () => {
        let car01 = await carsRepository.create(car1)
        let car02 = await carsRepository.create(car2)
        let car03 = await carsRepository.create(car3)
        const cars = await listCarsUseCase.execute({})
        expect(cars).toEqual([car01, car03])
    })

    it('should be able list all availables cars by name', async () => {
        let car01 = await carsRepository.create(car1)
        let car02 = await carsRepository.create(car2)
        let car03 = await carsRepository.create(car3)
        const cars = await listCarsUseCase.execute({ name: 'Car-01' })
        expect(cars).toEqual([car01])
    })
    it('should be able list all availables cars by brand', async () => {
        let car01 = await carsRepository.create(car1)
        let car02 = await carsRepository.create(car2)
        let car03 = await carsRepository.create(car3)
        const cars = await listCarsUseCase.execute({ brand: 'Chevrolet' })
        expect(cars).toEqual([car03])
    })
    it('should be able list all availables cars by category_id', async () => {
        let car01 = await carsRepository.create(car1)
        let car02 = await carsRepository.create(car2)
        let car03 = await carsRepository.create(car3)
        const cars = await listCarsUseCase.execute({ category_id: "43eba87f-d9af-4d68-99da-8f1ca22db275" })
        expect(cars).toEqual([car01])
    })

})

