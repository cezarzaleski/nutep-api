import mongoose from 'mongoose';
import request from 'supertest';
import { nestApp } from 'src/shared/infra/http/nestjs';
import { makeTestDb } from 'test/shared/infra/database/connection';
import { MongoPatientModel, MongoPatientSchema } from 'src/patient/infra/database/schemas/mongo-patient.schema';
import { CreatePatientInput } from 'src/shared/infra/http/nestjs/patient/input/create-patient-input';
import { Sex } from 'src/patient/domain/entity/sex';
import { HospitalizationStatus } from 'src/patient/domain/entity/hospitalization-status';
import Patient from 'src/patient/domain/entity/patient';
import { v4 as uuidv4 } from 'uuid';
import PatientRepositoryDatabase from 'src/patient/infra/database/repository/patient-repository-database';

describe('Patient Router', () => {
  let app;
  beforeAll(async () => {
    jest.setTimeout(1000)
    app = await nestApp()
    await app.init()
    await makeTestDb()
  })
  afterAll(async () => {
    await MongoPatientModel.deleteMany({})
    await mongoose.connection.close();
  });
  describe('POST /api/patient', () => {
    let createPatientInput: CreatePatientInput
    createPatientInput = {
      fullName: 'fullname',
      birthday: '2021-11-11',
      sex: 'F',
      register: '1212',
      attendingPhysician: 'attendingPhysician',
      healthCare: 'healthCare',
    }
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
        .post('/api/patients')
        .send(createPatientInput)
      // @ts-ignore
      const patientSaved: MongoPatientSchema = await MongoPatientModel.findOne({register: '1212'})
      expect(status).toBe(400)
      expect(body).not.toBeNull()
      expect(patientSaved.register).toEqual('1212')
    })
  })
  describe('GET ALL /api/patients', () => {
    let patient: Patient
    beforeAll(async () => {
      const patientRepository = new PatientRepositoryDatabase()
      patient = new Patient(
        uuidv4(),
        'dummy',
        new Date('2000-11-23'),
        Sex.Masculine,
        HospitalizationStatus.OnAdmission,
        uuidv4()
      );
      patient = await patientRepository.save(patient)
    })
    it('should return 200 find all patients none filter', async () => {
      const { status, body } = await request(app.getHttpServer())
        .get('/api/patients')
      // @ts-ignore
      expect(status).toBe(200)
      expect(body).not.toBeNull()
      expect(patient.fullName).toEqual('dummy')
    })
  })
})
