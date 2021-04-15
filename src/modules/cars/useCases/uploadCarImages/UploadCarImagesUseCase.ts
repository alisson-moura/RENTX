import { inject, injectable } from "tsyringe";
import { I_CarsImageRepository } from "@modules/cars/repositories/ICarsImageRepository";


@injectable()
class UploadCarImagesUseCase {
    private carsImagesRepository: I_CarsImageRepository

    constructor(
        @inject('CarsImagesRepository')
        carsImagesRepository: I_CarsImageRepository
    ) {
        this.carsImagesRepository = carsImagesRepository
    }

    async execute(car_id: string, images_name: string[]): Promise<void> {
        images_name.map(async (image) => {
            await this.carsImagesRepository.create(car_id, image)
        })
    }
}

export { UploadCarImagesUseCase }