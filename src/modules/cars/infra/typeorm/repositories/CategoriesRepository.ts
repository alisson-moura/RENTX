import { getRepository, Repository } from 'typeorm'
import { Category } from '../entities/Category'
import { ICategoriesRepository, ICreateCategoryDTO } from '../../../repositories/ICategoriesRepository'


class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>

    // private static INSTANCE: CategoriesRepository

    constructor() {
        this.repository = getRepository(Category)
    }

    /*
        public static getInstance(): CategoriesRepository {
            if (!CategoriesRepository.INSTANCE) {
                CategoriesRepository.INSTANCE = new CategoriesRepository()
            }
            return CategoriesRepository.INSTANCE
        }
    */

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = this.repository.create({
            name,
            description
        })
        await this.repository.save(category)
    }

    async list(): Promise<any> {
        const teste  = await this.repository.createQueryBuilder('category').where('category.name = :name', { name: 'SUV' }).getMany()
        return teste
    }

    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOne({ name })
        return category
    }
}

export { CategoriesRepository }