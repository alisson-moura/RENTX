import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../shared/errors/AppError'
import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository'

interface IRequest {
    name: string
    description: string
}

@injectable()
class CreateSpecificationUseCase {
    private specificationsRepository: ISpecificationsRepository

    constructor(
        @inject("SpecificationsRepository")
        specificationsRepository: ISpecificationsRepository
    ) {
        this.specificationsRepository = specificationsRepository
    }

    public async execute({ name, description }: IRequest): Promise<void> {
        const checkSpecificationAlreadyExists = await this.specificationsRepository.findByName(name)
        if (checkSpecificationAlreadyExists) {
            throw new AppError('Já existe uma especificação com esse nome!')
        }

        await this.specificationsRepository.create({ name, description })
    }
}
export { CreateSpecificationUseCase }