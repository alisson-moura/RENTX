import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UploadCarImagesUseCase } from './UploadCarImagesUseCase'

interface I_Files {
    filename: string
}

class UploadCarImagesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        const images = request.files as I_Files[]

        const filenames = images.map((file) => file.filename)

        const uploadCarImageUseCase = container.resolve(UploadCarImagesUseCase)
        await uploadCarImageUseCase.execute(id, filenames)

        return response.status(201).send()
    }
}

export { UploadCarImagesController }