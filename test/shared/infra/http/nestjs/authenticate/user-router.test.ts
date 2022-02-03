import mongoose from 'mongoose'
import request from 'supertest'
import { nestApp } from 'src/shared/infra/http/nestjs'
import { makeTestDb } from 'test/shared/infra/database/connection'
import { MongoUserModel } from 'src/authenticate/infra/database/schemas/mongo-user.schema'
import GeneratePassword from 'src/authenticate/domain/service/generate-password'
import { v4 as uuidv4 } from 'uuid'

describe('User Router', () => {
  let app: any
  let user: any
  let userId: string
  beforeAll(async () => {
    jest.setTimeout(1000)
    app = await nestApp()
    const password = await GeneratePassword.generate('dummy')
    userId = uuidv4()
    user = { email: 'testee@gmail.com', password: password, name: 'teste', uuid: userId }
    await app.init()
    await makeTestDb()
  })
  afterAll(async () => {
    await MongoUserModel.deleteOne(user)
    await mongoose.connection.close()
  })
  describe('GET /users/id', () => {
    it('should return 200 user success', async () => {
      await MongoUserModel.create(user)
      const { status, body } = await request(app.getHttpServer())
        .get(`/api/users/${userId}`)
      expect(status).toBe(200)
      expect(body.name).toEqual(user.name)
      expect(body.email).toEqual(user.email)
      expect(body.id).toEqual(user.uuid)
    })
  })
})
