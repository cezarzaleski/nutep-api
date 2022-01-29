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
      birthday: '2021-11-11',
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
    it('should return 201 patient created', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post('/api/patient')
        .send(createPatientInput)
      // @ts-ignore
      const patientSaved: MongoPatientSchema = await MongoPatientModel.findOne({register: '1212'})
      expect(status).toBe(201)
      expect(body).not.toBeNull()
      expect(patientSaved.register).toEqual('1212')
    })
    it('should return 400 patient created', async () => {
      createPatientInput.birthday = '21/11/1988'
      const { status, body } = await request(app.getHttpServer())
        .post('/api/patient')
        .send(createPatientInput)
      // @ts-ignore
      const patientSaved: MongoPatientSchema = await MongoPatientModel.findOne({register: '1212'})
      expect(status).toBe(400)
      expect(body).not.toBeNull()
      expect(patientSaved.register).toEqual('1212')
    })
  })
  describe('GET ALL /api/patient', () => {
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
    it('should return 400 patient created', async () => {
      createPatientInput.birthday = '21/11/1988'
      const { status, body } = await request(app.getHttpServer())
        .post('/api/patient')
        .send(createPatientInput)
      // @ts-ignore
      const patientSaved: MongoPatientSchema = await MongoPatientModel.findOne({register: '1212'})
      expect(status).toBe(400)
      expect(body).not.toBeNull()
      expect(patientSaved.register).toEqual('1212')
    })
  })
})
