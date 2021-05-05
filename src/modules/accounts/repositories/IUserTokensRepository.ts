import { I_CreateUserTokensDTO } from "../dtos/ICreateUserTokensDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

interface I_UserTokensRepository {
    create(data: I_CreateUserTokensDTO): Promise<UserTokens>
}

export { I_UserTokensRepository }