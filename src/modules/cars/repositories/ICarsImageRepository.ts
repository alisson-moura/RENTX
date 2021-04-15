import { CarImage } from "../infra/typeorm/entities/CarImage";

interface I_CarsImageRepository {
    create(car_id: string, image_name: string): Promise<CarImage>
}

export { I_CarsImageRepository }