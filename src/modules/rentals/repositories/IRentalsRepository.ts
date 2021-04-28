import { I_CreateRentalDTO } from "../dtos";
import { Rental } from "../infra/typeorm/entities/Rental";


interface I_RentalsRepository {
    findOpenRentalByCar(car_id: string): Promise<Rental>
    findOpenRentalByUser(user_id: string): Promise<Rental>
    create({ car_id, expected_return_date, user_id }: I_CreateRentalDTO): Promise<Rental>
    findById(rental_id: string): Promise<Rental>
    findByUser(user_id: string): Promise<Rental[]>
}

export { I_RentalsRepository }