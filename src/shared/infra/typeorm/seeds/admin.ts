import { v4 as uuid } from 'uuid'
import { hash } from 'bcryptjs'
import createConnetion from '../index'

async function create() {
    const connection = await createConnetion("localhost")
    const id = uuid()
    const password = await hash('admin', 8)

    await connection.query(
        `INSERT INTO users (id, name, email, password, "isAdmin", created_at, driver_license)
        VALUES('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'xxxxxx')`
    )

    await connection.close()
}


create().then(() => console.log("User Admin Created"))