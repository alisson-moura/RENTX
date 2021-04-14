import { Category } from "../../infra/typeorm/entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";

class CategoriesReposiotoryInMemory implements ICategoriesRepository {
    private creategories: Category[] = []

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = new Category()
        Object.assign(category, { name, description })
        this.creategories.push(category)
    }
    async findByName(name: string): Promise<Category> {
        const category = this.creategories.find((category) => category.name === name)
        return category
    }
    async list(): Promise<Category[]> {
        const all = this.creategories
        return all
    }

}

export { CategoriesReposiotoryInMemory }