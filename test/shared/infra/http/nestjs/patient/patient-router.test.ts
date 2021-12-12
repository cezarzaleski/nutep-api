import mongoose from 'mongoose';
import request from 'supertest';
import { nestApp } from 'src/shared/infra/http/nestjs';
import { makeTestDb } from 'test/shared/infra/database/connection';
import { MongoPatientModel, MongoPatientSchema } from 'src/patient/infra/database/schemas/mongo-patient.schema';
import { CreatePatientInput } from 'src/shared/infra/http/nestjs/patient/input/create-patient-input';

describe('Patient Router', () => {
  let app;
  let createPatientInput: CreatePatientInput
  beforeAll(async () => {
    jest.setTimeout(1000)
    app = await nestApp()
    await app.init()
    await makeTestDb()
    createPatientInput = {
      fullName: 'fullname',
      birthday: new Date('2021-11-11').toDateString(),
      sex: 'F',
      register: '1212',
      attendingPhysician: 'attendingPhysician',
      healthCare: 'healthCare',
    }
  })
  afterAll(async () => {
    await MongoPatientModel.deleteMany({})
    await mongoose.connection.close();
  });
  describe('POST /api/patient', () => {
    it('should return 200 patient created', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post('/api/patient')
        .send(createPatientInput)
      // @ts-ignore
      const patientSaved: MongoPatientSchema = await MongoPatientModel.findOne({register: '1212'})
      expect(status).toBe(200)
      expect(body).not.toBeNull()
      expect(patientSaved.register).toEqual('1212')
    })
    // it('should return 400 birdDate invalid', async () => {
    //   createPatientInput.birthday = '21/11/1988'
    //   const { status, body } = await request(app.getHttpServer())
    //     .post('/api/patient')
    //     .send(createPatientInput)
    //   expect(status).toBe(400)
    // })
  })
})
