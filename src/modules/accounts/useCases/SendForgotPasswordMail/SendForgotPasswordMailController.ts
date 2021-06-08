import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

class SendForgotPasswordMailController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email } = request.body
        const sendForgotMailPassword = container.resolve(SendForgotPasswordMailUseCase)
        await sendForgotMailPassword.execute(email)

        return response.status(201).send()
    }
}
export { SendForgotPasswordMailController }