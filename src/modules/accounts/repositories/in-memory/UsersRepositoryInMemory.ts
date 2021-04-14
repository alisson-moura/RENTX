import { I_CreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/typeorm/entities/User";
import { I_UsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements I_UsersRepository {
    private users: User[] = []
    async create({ name, driver_license, email, password }: I_CreateUserDTO): Promise<void> {
        const user = new User()
        Object.assign(user, { name, driver_license, email, password })
        this.users.push(user)
    }
    async findByEmail(email: string): Promise<User> {
        return this.users.find((user) => user.email === email)
    }
    async findById(user_id: string): Promise<User> {
        return this.users.find((user) => user.id === user_id)
    }
}
export { UsersRepositoryInMemory }