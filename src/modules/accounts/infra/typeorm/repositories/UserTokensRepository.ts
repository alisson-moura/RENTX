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