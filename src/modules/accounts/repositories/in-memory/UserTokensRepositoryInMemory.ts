import { I_CreateUserTokensDTO } from "@modules/accounts/dtos/ICreateUserTokensDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { I_UserTokensRepository } from "../IUserTokensRepository";

class UserTokensRepositoryInMemory implements I_UserTokensRepository {
    private userTokens: UserTokens[] = []

    async findByUserIdAndRefreshToken(user_id: string, token: string): Promise<UserTokens> {
        const userToken = this.userTokens.find(userToken => userToken.user_id === user_id
            && userToken.refresh_token === token)
        return userToken
    }

    async create({ expires_date, refresh_token, user_id }: I_CreateUserTokensDTO): Promise<UserTokens> {
        const userToken = new UserTokens()
        Object.assign(userToken, {
            expires_date,
            refresh_token,
            user_id
        })
        this.userTokens.push(userToken)
        return userToken
    }

    async deleteById(token_id: string): Promise<void> {
        const userToken = this.userTokens.find(ut => ut.id === token_id)
        this.userTokens.splice(this.userTokens.indexOf(userToken))
    }

    async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        return this.userTokens.find(ut => ut.refresh_token === refresh_token)
    }

}
export { UserTokensRepositoryInMemory }