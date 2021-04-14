import { I_CreateUserDTO } from '../dtos/ICreateUserDTO'
import { User } from '../infra/typeorm/entities/User'

interface I_UsersRepository {
    create(data: I_CreateUserDTO): Promise<void>
    findByEmail(email: string): Promise<User>
    findById(user_id: string): Promise<User>
}

export { I_UsersRepository }