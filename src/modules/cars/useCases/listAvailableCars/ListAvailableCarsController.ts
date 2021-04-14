import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListCarsUseCase } from './ListCarsUseCase'


class ListAvailableCarsController {

    public async handle(request: Request, response: Response): Promise<Response> {
        const { brand, category_id, name } = request.query

        const listCars = container.resolve(ListCarsUseCase)
        const cars = await listCars.execute({
            brand: brand as string,
            category_id: category_id as string,
            name: name as string
        })

        return response.status(200).json(cars)
    }

}
export { ListAvailableCarsController }