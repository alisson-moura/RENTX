import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import auth from '@config/auth'
import { AppError } from '../../../errors/AppError'
import { UsersRepository } from '../../../../modules/accounts/infra/typeorm/repositories/UsersRepository'
import { UserTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UserTokensRepository'

interface I_Payload {
    sub: string
}
export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization
    const userTokensRepository = new UserTokensRepository()

    if (!authHeader) {
        throw new AppError("Faltando token.", 401)
    }

    const [, token] = authHeader.split(" ")

    try {
        const { sub: user_id } = verify(token, auth.secret_token) as I_Payload
        request.user = {
            id: user_id
        }
        next()
    } catch (error) {
        throw new AppError("Token Invalído.", 401)
    }
}