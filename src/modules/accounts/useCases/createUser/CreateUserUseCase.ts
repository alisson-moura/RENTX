import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { I_CreateUserDTO } from "../../dtos/ICreateUserDTO";
import { I_UsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
    private usersRepository: I_UsersRepository

    constructor(
        @inject('UsersRepository')
        usersRepository: I_UsersRepository
    ) {
        this.usersRepository = usersRepository
    }


    public async execute({
        driver_license,
        email,
        name,
        password
    }: I_CreateUserDTO): Promise<void> {
        const userAlreadyExists = await this.usersRepository.findByEmail(email);
        if (userAlreadyExists) {
            throw new AppError("Este email já está em uso.")
        }

        const passwordHash = await hash(password, 8)
        await this.usersRepository.create({
            driver_license,
            email,
            name,
            password: passwordHash
        })
    }
}
export { CreateUserUseCase }