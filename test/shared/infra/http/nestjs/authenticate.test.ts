import mongoose from 'mongoose';
import request from 'supertest';
import { nestApp } from 'src/shared/infra/http/nestjs';
import { makeTestDb } from 'test/shared/infra/database/connection';

describe('Authenticate Router', () => {
  let app;
  beforeAll(async () => {
    jest.setTimeout(1000)
    app = await nestApp()
    await app.init()
    await makeTestDb()
  })
  afterAll(async () => {
    await mongoose.connection.close();
  });
  describe('POST /auth/login', () => {
    it('should return 200 login success', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({})
      expect(status).toBe(200)
      expect(body).not.toBeNull()
    })
  })
})
