import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DevolutionRentalUseCase } from './devolutionRentalUseCase'
class DevolutionRentalController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        const { id: user_id } = request.user

        const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase)
        const rental = await devolutionRentalUseCase.execute({ rental_id: id, user_id })

        return response.json(rental)
    }
}
export { DevolutionRentalController }