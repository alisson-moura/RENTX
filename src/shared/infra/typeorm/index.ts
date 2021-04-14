import { Connection, createConnection, getConnection, getConnectionOptions } from 'typeorm'

export default async (host: string = "database"): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions()

    return createConnection(Object.assign(defaultOptions, {
        host,
    }))
}
