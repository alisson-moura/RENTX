import { container } from 'tsyringe'
import { UsersRepository } from '../../modules/accounts/infra/typeorm/repositories/UsersRepository'
import { I_UsersRepository } from '../../modules/accounts/repositories/IUsersRepository'
import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository'
import { CategoriesRepository } from '../../modules/cars/infra/typeorm/repositories/CategoriesRepository'
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository'
import { ISpecificationsRepository } from '../../modules/cars/repositories/ISpecificationsRepository'
import { I_CarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository'
import { I_CarsImageRepository } from '@modules/cars/repositories/ICarsImageRepository'
import { CarsImagesRepository } from '@modules/cars/infra/typeorm/repositories/CarsImageRepository'

container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
)

container.registerSingleton<ISpecificationsRepository>(
    "SpecificationsRepository",
    SpecificationsRepository
)

container.registerSingleton<I_UsersRepository>(
    "UsersRepository",
    UsersRepository
)

container.registerSingleton<I_CarsRepository>(
    "CarsRepository",
    CarsRepository
)

container.registerSingleton<I_CarsImageRepository>(
    "CarsImagesRepository",
    CarsImagesRepository
)