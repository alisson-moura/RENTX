import { RefreshTokenController } from '@modules/accounts/useCases/refreshToken/RefreshTokenController'
import { Router } from 'express'
import { AuthenticateUserController } from '../../../../modules/accounts/useCases/authenticateUser/authenticateUserController'
const sessionsRoutes = Router()

const authenticateUserController = new AuthenticateUserController()
const refreshTokenController = new RefreshTokenController()

sessionsRoutes.post("/sessions", authenticateUserController.handle)
sessionsRoutes.post("/refresh-token", refreshTokenController.handle)

export { sessionsRoutes }