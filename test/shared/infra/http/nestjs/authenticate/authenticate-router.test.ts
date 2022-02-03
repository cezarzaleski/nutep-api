import mongoose from 'mongoose'
import request from 'supertest'
import { nestApp } from 'src/shared/infra/http/nestjs'
import { makeTestDb } from 'test/shared/infra/database/connection'
import { MongoUserModel } from 'src/authenticate/infra/database/schemas/mongo-user.schema'
import GeneratePassword from 'src/authenticate/domain/service/generate-password'

describe('Authenticate Router', () => {
  let app: any
  let user: any
  beforeAll(async () => {
    jest.setTimeout(1000)
    app = await nestApp()
    const password = await GeneratePassword.generate('dummy')
    user = { email: 'testee@gmail.com', password: password, name: 'teste' }
    await app.init()
    await makeTestDb()
  })
  afterAll(async () => {
    await MongoUserModel.deleteOne(user)
    await mongoose.connection.close()
  })
  describe('POST /auth/login', () => {
    it('should return 200 login success', async () => {
      await MongoUserModel.create(user)
      const { status, body } = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ username: 'testee@gmail.com', password: 'dummy' })
      expect(status).toBe(200)
      expect(body).not.toBeNull()
    })
  })
})
