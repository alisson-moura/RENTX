import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'
import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../shared/errors/AppError'

interface Request {
    name: string
    description: string
}

@injectable()
class CreateCategoryUseCase {
    private categoriesRepository: ICategoriesRepository

    constructor(
        @inject("CategoriesRepository")
        categoriesRepository: ICategoriesRepository
    ) {
        this.categoriesRepository = categoriesRepository
    }

    public async execute({ name, description }: Request): Promise<void> {
        const checkCategoryAlreadyExists = await this.categoriesRepository.findByName(name)
        if (checkCategoryAlreadyExists) {
            throw new AppError('Já existe uma categoria com esse nome!')
        }

        this.categoriesRepository.create({ name, description })
    }
}
export { CreateCategoryUseCase }