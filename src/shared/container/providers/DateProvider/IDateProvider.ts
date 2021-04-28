
interface I_DateProvider {
    compareInHours(end_date: Date, start_date: Date): number
    compareInDays(end_date: Date, start_date: Date): number
    convertToUTC(date: Date): string
    dateNow(): Date
}

export { I_DateProvider }