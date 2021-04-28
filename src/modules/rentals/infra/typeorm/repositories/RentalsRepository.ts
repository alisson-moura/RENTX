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
                car_id,
                end_date: null
            }
        })
        return rental
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        const user = await this.repository.findOne({
            where: {
                user_id,
                end_date: null
            }
        })
        return user
    }

    async create({ car_id, expected_return_date, user_id, id, end_date, total }: I_CreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            car_id,
            expected_return_date,
            user_id,
            id,
            end_date,
            total
        })
        await this.repository.save(rental)
        return rental
    }

    async findById(rental_id: string): Promise<Rental> {
        const rental = await this.repository.findOne(rental_id)
        return rental
    }

    async findByUser(user_id: string): Promise<Rental[]> {
        const rentals = await this.repository.find({
            where: {
                user_id
            },
            relations: ['car']
        })
        return rentals
    }

}

export { RentalsRepository }