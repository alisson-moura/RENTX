import auth from "@config/auth"
import { I_UserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository"
import { I_DateProvider } from "@shared/container/providers/DateProvider/IDateProvider"
import { AppError } from "@shared/errors/AppError"
import { sign, verify } from "jsonwebtoken"
import { inject, injectable } from "tsyringe"

interface I_Payload {
    sub: string
    email: string
}

interface I_TokenResponse {
    refresh_token: string
    token: string
}

@injectable()
class RefreshTokenUseCase {
    private userTokensRepository: I_UserTokensRepository
    private dateProvider: I_DateProvider

    constructor(
        @inject("UserTokensRepository")
        userTokensRepository: I_UserTokensRepository,

        @inject("DateProvider")
        dateProvider: I_DateProvider
    ) {
        this.userTokensRepository = userTokensRepository
        this.dateProvider = dateProvider
    }

    async execute(token: string): Promise<I_TokenResponse> {
        const { email, sub } = verify(token, auth.secret_refresh_token) as I_Payload
        const user_id = sub

        const userToken = await this.userTokensRepository.findByUserIdAndRefreshToken(user_id, token)
        if (!userToken) {
            throw new AppError("Refresh Token does not exists!")
        }

        await this.userTokensRepository.deleteById(userToken.id)
        const refresh_token = sign({ email }, auth.secret_refresh_token, {
            subject: sub,
            expiresIn: auth.expires_in_refresh_token
        })

        await this.userTokensRepository.create({
            user_id,
            refresh_token,
            expires_date: this.dateProvider.addDays(auth.expire_refresh_token_days),
        })

        const newToken = sign({}, auth.secret_token, {
            expiresIn: auth.expires_in_token,
            subject: user_id
        })

        return { refresh_token, token: newToken }
    }
}

export { RefreshTokenUseCase }