import auth from "@config/auth"
import { I_UserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository"
import { I_DateProvider } from "@shared/container/providers/DateProvider/IDateProvider"
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
    token: string,
    refresh_token: string
}

@injectable()
class AuthenticateUserUseCase {
    private usersRepository: I_UsersRepository
    private userTokensRepository: I_UserTokensRepository
    private dateProvider: I_DateProvider

    constructor(
        @inject("UsersRepository")
        usersRepository: I_UsersRepository,

        @inject('UserTokensRepository')
        userTokenRepository: I_UserTokensRepository,

        @inject("DateProvider")
        dateProvider: I_DateProvider
    ) {
        this.usersRepository = usersRepository
        this.userTokensRepository = userTokenRepository
        this.dateProvider = dateProvider
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

        const token = sign({}, auth.secret_token, {
            expiresIn: auth.expires_in_token,
            subject: user.id
        })

        const refresh_token = sign({email}, auth.secret_refresh_token, {
            subject: user.id,
            expiresIn: auth.expires_in_refresh_token
        })

        await this.userTokensRepository.create({
            expires_date: this.dateProvider.addDays(auth.expire_refresh_token_days),
            refresh_token,
            user_id: user.id
        })

        const response: I_Response = {
            user: {
                name: user.name,
                email: user.email
            },
            token,
            refresh_token
        }
        return response
    }

}

export { AuthenticateUserUseCase }