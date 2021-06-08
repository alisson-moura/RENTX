
interface I_DateProvider {
    compareInHours(end_date: Date, start_date: Date): number
    compareInDays(end_date: Date, start_date: Date): number
    convertToUTC(date: Date): string
    dateNow(): Date
    addDays(days: number): Date;
    addHour(hours: number): Date;
    compareIfBefore(start_date: Date, end_date: Date): boolean
}

export { I_DateProvider }