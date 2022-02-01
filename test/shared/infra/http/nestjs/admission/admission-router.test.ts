import mongoose from 'mongoose';
import request from 'supertest';
import { nestApp } from 'src/shared/infra/http/nestjs';
import { makeTestDb } from 'test/shared/infra/database/connection';
import { MongoPatientModel, MongoPatientSchema } from 'src/admission/infra/database/schemas/mongo-patient.schema';
import { MongoAdmissionModel, MongoAdmissionSchema } from 'src/admission/infra/database/schemas/mongo-admission.schema';
import { InitialAdmissionInput, PatientInput } from 'src/admission/application/dto/initial-admission-input';

describe('Admission Router', () => {
  let app;
  beforeAll(async () => {
    jest.setTimeout(1000)
    app = await nestApp()
    await app.init()
    await makeTestDb()
  })
  afterAll(async () => {
    await MongoPatientModel.deleteMany({})
    await MongoAdmissionModel.deleteMany({})
    await mongoose.connection.close();
  });
  afterEach(async () => {
    await MongoAdmissionModel.deleteMany({})
    await MongoPatientModel.deleteMany({})
  });
  describe('POST /api/admissions/initial', () => {
    let initialAdmissionInput: InitialAdmissionInput
    let patientInput = new PatientInput(
      'fullname',
      '2021-11-11',
      'F',
      '432.270.380-13',
      '1212',
      'attendingPhysician'
    )
    initialAdmissionInput = {
      patient: patientInput,
      status: 'initial'
    }
    it('should return 201 patient initial admission', async () => {
      const {status, body} = await request(app.getHttpServer())
        .post('/api/admissions/initial')
        .send(initialAdmissionInput)
      // @ts-ignore
      const patientSaved: MongoPatientSchema = await MongoPatientModel.findOne({register: '1212'})
      // @ts-ignore
      const admissionSaved: MongoAdmissionSchema = await MongoAdmissionModel.findOne({status: 'initial'})
        .populate('patient')
      expect(status).toBe(201)
      expect(body).not.toBeNull()
      expect(patientSaved).not.toBeNull()
      expect(admissionSaved).not.toBeNull()
    })
  })
})
