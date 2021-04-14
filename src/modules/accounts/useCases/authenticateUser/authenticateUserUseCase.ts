import { compare } from "bcryptjs"
import e from "express"
import { sign } from "jsonwebtoken"
import { inject, injectable } from "tsyringe"
import { AppError } from "../../../../shared/errors/AppError"
import { I_UsersRepository } from "../../repositories/IUsersRepository"

interface I_Request {
    email: string
    password: string
}

interface I_Response {
    user: {
        name: string,
        email: string,
    },
    token: string
}

@injectable()
class AuthenticateUserUseCase {
    private usersRepository: I_UsersRepository

    constructor(
        @inject("UsersRepository")
        usersRepository: I_UsersRepository
    ) {
        this.usersRepository = usersRepository
    }

    public async execute({ password, email }: I_Request): Promise<I_Response> {
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new AppError("E-mail ou senha incorretos!")
        }

        const passwordMatch = await compare(password, user.password)
        if (!passwordMatch) {
            throw new AppError("E-mail ou senha incorretos!")
        }

        const token = sign({}, "3ceaff7692b58c1d2786ea973c726b5c", {
            expiresIn: "1d",
            subject: user.id
        })

        const response: I_Response = {
            user: {
                name: user.name,
                email: user.email
            },
            token
        }
        return response
    }

}

export { AuthenticateUserUseCase }