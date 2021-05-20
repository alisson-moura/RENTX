import { I_CreateUserTokensDTO } from "../dtos/ICreateUserTokensDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

interface I_UserTokensRepository {
    findByUserIdAndRefreshToken(user_id: string, token: string):Promise<UserTokens>;
    create(data: I_CreateUserTokensDTO): Promise<UserTokens>
    deleteById(token_id: string): Promise<void>
}

export { I_UserTokensRepository }