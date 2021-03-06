import { UserTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserTokensRepositoryInMemory"
import { I_UserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository"
import { I_DateProvider } from "@shared/container/providers/DateProvider/IDateProvider"
import { DayjsProvider } from "@shared/container/providers/DateProvider/implementations/DayjsProvider"
import { AppError } from "../../../../shared/errors/AppError"
import { I_CreateUserDTO } from "../../dtos/ICreateUserDTO"
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./authenticateUserUseCase"

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUserCase: CreateUserUseCase
let userTokensRepository: I_UserTokensRepository
let dateProvider: I_DateProvider

const makeCreateUser = () => {
    const validUser: I_CreateUserDTO = {
        driver_license: '000123',
        email: 'valid_email@domain.com',
        password: 'valid_password',
        name: 'valid_name'
    }

    const invalidUser = {
        email: 'invalid_email@domain.com',
        password: 'invalid_password'
    }

    return { validUser, invalidUser }
}

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory()
        createUserUserCase = new CreateUserUseCase(usersRepositoryInMemory)
        userTokensRepository = new UserTokensRepositoryInMemory()
        dateProvider = new DayjsProvider()
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory, userTokensRepository, dateProvider)
    })

    it("should be able to authenticated an user", async () => {
        const { validUser } = makeCreateUser()
        await createUserUserCase.execute(validUser)

        const result = await authenticateUserUseCase.execute({
            email: validUser.email,
            password: validUser.password
        })

        expect(result).toHaveProperty('token')
    })

    it("should not be able to authenticate an non existent user", async () => {
        const { invalidUser } = makeCreateUser()
        await expect(authenticateUserUseCase.execute({
            email: invalidUser.email,
            password: invalidUser.password
        })
        ).rejects.toEqual(new AppError("E-mail ou senha incorretos!"))
    })

    it("should not be able to authenticate an invalid password", async () => {
        const { validUser } = makeCreateUser()
        await createUserUserCase.execute(validUser)
        expect(authenticateUserUseCase.execute({
            email: validUser.email,
            password: 'invalid_password'
        })
        ).rejects.toEqual(new AppError("E-mail ou senha incorretos!"))
    })
})