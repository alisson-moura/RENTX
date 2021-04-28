interface I_CreateRentalDTO {
    user_id: string
    car_id: string
    expected_return_date: Date
    id?: string
    end_date?: Date, 
    total?: number
}

export { I_CreateRentalDTO }