import 'reflect-metadata'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { hash } from 'bcryptjs'
import { Connection } from 'typeorm'

import { app } from '@shared/infra/http/app'
import createConnection from '@shared/infra/typeorm'


let connection: Connection

describe('List Categories Controller', () => {

    beforeAll(async () => {
        connection = await createConnection()
        await connection.runMigrations()
        const id = uuid()
        const password = await hash('admin', 8)

        await connection.query(
            `INSERT INTO users (id, name, email, password, "isAdmin", created_at, driver_license)
            VALUES('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'xxxxxx')`
        )

    })

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close()
    })

    it('should be able to list all categories', async () => {
        const responseToken = await request(app).post('/sessions').send({
            email: 'admin@rentx.com.br',
            password: 'admin'
        })

        const { refresh_token } = responseToken.body

        await request(app).post('/categories').send({
            name: 'Category valid name',
            description: 'Description of category'
        }).set({
            Authorization: `Bearer ${refresh_token}`
        })

        const response = await request(app).get('/categories').set({
            Authorization: `Bearer ${refresh_token}`
        })

        expect(response.status).toBe(200)
        expect(response.body.length).toBe(1)
    })
})