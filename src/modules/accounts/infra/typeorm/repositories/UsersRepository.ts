import { Repository, getRepository } from 'typeorm'

import { User } from '../entities/User';
import { I_UsersRepository } from "../../../repositories/IUsersRepository";
import { I_CreateUserDTO } from "../../../dtos/ICreateUserDTO";

class UsersRepository implements I_UsersRepository {
    private repository: Repository<User>

    constructor() {
        this.repository = getRepository(User)
    }

    public async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ email })
        return user
    }

    public async findById(user_id: string): Promise<User> {
        const user = await this.repository.findOne({ id: user_id })
        return user
    }

    public async create({ name, driver_license, email, password, avatar, id }: I_CreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            driver_license,
            email,
            password,
            avatar,
            id
        })

        await this.repository.save(user)
    }
}

export { UsersRepository }