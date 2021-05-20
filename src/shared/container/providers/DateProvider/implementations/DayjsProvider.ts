import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'

import { I_DateProvider } from "../IDateProvider";

dayjs.extend(utc)

class DayjsProvider implements I_DateProvider {

    addDays(days: number): Date {
        return dayjs().add(days, "day").toDate()
    }

    compareInDays(end_date: Date, start_date: Date): number {
        const end_date_utc = this.convertToUTC(end_date)
        const start_date_utc = this.convertToUTC(start_date)
        return dayjs(end_date_utc).diff(start_date_utc, "days")

    }

    compareInHours(end_date: Date, start_date: Date): number {
        const end_date_utc = this.convertToUTC(end_date)
        const start_date_utc = this.convertToUTC(start_date)
        return dayjs(end_date_utc).diff(start_date_utc, "hours")
    }

    convertToUTC(date: Date): string {
        return dayjs(date).utc().local().format()
    }

    dateNow(): Date {
        return dayjs().toDate()
    }

}

export { DayjsProvider }