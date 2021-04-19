import { I_CreateRentalDTO } from "@modules/rentals/dtos";
import { I_RentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { getRepository, Repository } from "typeorm";
import { Rental } from "../entities/Rental";

class RentalsRepository implements I_RentalsRepository {
    private repository: Repository<Rental>
    constructor() {
        this.repository = getRepository(Rental)
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        const rental = await this.repository.findOne({
            where: {
                car_id
            }
        })
        return rental
    }
    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        const user = await this.repository.findOne({
            where: {
                user_id
            }
        })
        return user
    }
    async create({ car_id, expected_return_date, user_id }: I_CreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            car_id,
            expected_return_date,
            user_id
        })
        await this.repository.save(rental)
        return rental
    }

}

export { RentalsRepository }