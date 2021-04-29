import { AppError } from "../../../../shared/errors/AppError"
import { CategoriesReposiotoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory"
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"

let createCategoryUseCase: CreateCategoryUseCase
let categoriesRepositoryInMemory: CategoriesReposiotoryInMemory

const makeCategory = () => {
   const validCategory = {
      name: 'Category Test',
      description: 'Category used by tests'
   }
   return {
      validCategory
   }
}

describe("Create Category", () => {

   beforeEach(() => {
      categoriesRepositoryInMemory = new CategoriesReposiotoryInMemory()
      createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory)
   })

   it("should be able to create a new category", async () => {
      const { validCategory } = makeCategory()
      await createCategoryUseCase.execute({
         name: validCategory.name,
         description: validCategory.description
      })

      const category = await categoriesRepositoryInMemory.findByName(validCategory.name)

      expect(category).toHaveProperty('id')
   })

   it("should not  be able to create a new category with name exists", async () => {
      const { validCategory } = makeCategory()
      await createCategoryUseCase.execute({
         name: validCategory.name,
         description: validCategory.description
      })
      await expect(
         createCategoryUseCase.execute({
            name: validCategory.name,
            description: validCategory.description
         })
      ).rejects.toEqual(new AppError('Já existe uma categoria com esse nome!'))
   })
})