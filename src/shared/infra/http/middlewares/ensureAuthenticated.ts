import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { AppError } from '../../../errors/AppError'
import { UsersRepository } from '../../../../modules/accounts/infra/typeorm/repositories/UsersRepository'

interface I_Payload {
    sub: string
}
export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization
    if (!authHeader) {
        throw new AppError("Faltando token.", 401)
    }

    const [, token] = authHeader.split(" ")

    try {
        const { sub: user_id } = verify(token, "3ceaff7692b58c1d2786ea973c726b5c") as I_Payload
        const usersRepository = new UsersRepository()
        const user = await usersRepository.findById(user_id)
        if (!user) {
            throw new AppError("Usuário não existe.", 401)
        }
        request.user = {
            id: user_id
        }
        next()
    } catch (error) {
        throw new AppError("Token Invalído.", 401)
    }
}