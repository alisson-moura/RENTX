import { I_CreateUserTokensDTO } from "@modules/accounts/dtos/ICreateUserTokensDTO";
import { I_UsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { I_UserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { getRepository, Repository } from "typeorm";
import { UserTokens } from "../entities/UserTokens";

class UserTokensRepository implements I_UserTokensRepository {
    private repository: Repository<UserTokens>

    constructor() {
        this.repository = getRepository(UserTokens)
    }
    async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        const token = await this.repository.findOne({
            refresh_token
        })
        return token
    }

    async findByUserIdAndRefreshToken(user_id: string, token: string): Promise<UserTokens> {
        const refresh_token = await this.repository.findOne({
            user_id,
            refresh_token: token
        })
        return refresh_token
    }
    async deleteById(token_id: string): Promise<void> {
        await this.repository.delete(token_id)
    }

    async create({ expires_date, refresh_token, user_id }: I_CreateUserTokensDTO): Promise<UserTokens> {
        const userToken = this.repository.create({
            expires_date,
            refresh_token,
            user_id
        })

        await this.repository.save(userToken)
        return userToken
    }

}
export { UserTokensRepository }