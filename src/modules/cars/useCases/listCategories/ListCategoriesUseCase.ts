import { inject, injectable } from 'tsyringe'
import { Category } from '../../infra/typeorm/entities/Category'
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'

@injectable()
class ListCategoriesUseCase {
    private categoriesRepositories: ICategoriesRepository

    constructor(
        @inject("CategoriesRepository")
        categoriesRepositorie: ICategoriesRepository
    ) {
        this.categoriesRepositories = categoriesRepositorie
    }

    public async execute(): Promise<Category[]> {
        const categories = await this.categoriesRepositories.list()
        return categories
    }
}

export { ListCategoriesUseCase }