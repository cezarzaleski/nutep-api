import mongoose from 'mongoose'
import request from 'supertest'
import { nestApp } from 'src/shared/infra/http/nestjs'
import { makeTestDb } from 'test/shared/infra/database/connection'
import { MongoPatientModel } from 'src/admission/infra/database/schemas/mongo-patient.schema'
import { MongoPatientAdmissionModel, MongoPatientAdmissionSchema } from 'src/admission/infra/database/schemas/mongo-patient-admission.schema'
import { MongoInitialHealthModel } from 'src/admission/infra/database/schemas/mongo-initial-health.schema'
import { InitialHealthInput } from 'src/admission/application/dto/initial-health-input'
import PatientAdmission from 'src/admission/domain/entity/patient-admission'
import Patient from 'src/admission/domain/entity/patient'
import PatientAdmissionRepositoryDatabase from 'src/admission/infra/database/repository/patient-admission-repository-database'
import PatientRepositoryDatabase from 'src/admission/infra/database/repository/patient-repository-database'
import { Sex } from 'src/admission/domain/entity/sex'
import { HospitalizationStatus } from 'src/admission/domain/entity/hospitalization-status'
import { ConsciousnessLevel } from 'src/admission/domain/entity/consciousness-level'

describe('Initial Health Router', () => {
  let app: any
  beforeAll(async () => {
    jest.setTimeout(1000)
    app = await nestApp()
    await app.init()
    await makeTestDb()
  })
  afterAll(async () => {
    await MongoInitialHealthModel.deleteMany({})
    await MongoPatientAdmissionModel.deleteMany({})
    await mongoose.connection.close()
  })
  afterEach(async () => {
    await MongoInitialHealthModel.deleteMany({})
    await MongoPatientModel.deleteMany({})
  })
  describe('POST /api/admissions/initial-health', () => {
    let admission: PatientAdmission
    let patient: Patient
    beforeAll(async () => {
      const admissionRepository = new PatientAdmissionRepositoryDatabase()
      const patientRepository = new PatientRepositoryDatabase()
      patient = new Patient(
        new mongoose.Types.ObjectId().toString(),
        'dummy',
        '2000-11-23',
        Sex.Masculine,
        HospitalizationStatus.OnAdmission,
        'hospitalId'
      )
      patient = await patientRepository.save(patient)
      admission = new PatientAdmission(
        new mongoose.Types.ObjectId().toString(),
        patient.id,
        'initial'
      )
      admission = await admissionRepository.save(admission)
    })
    const initialHealthInput = new InitialHealthInput(
      'initialDescription',
      undefined,
      [ConsciousnessLevel.Sedated],
      'dialysis',
      'Y',
      'Y',
      undefined,
      ['comorbidities'],
      ['allergies'],
      { has: 'N' }
    )
    it('should return 201 patient initial health', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post(`/api/initial-health/admission/${admission.id}`)
        .send(initialHealthInput)
      // @ts-expect-error
      const admissionSaved: MongoPatientAdmissionSchema = await MongoPatientAdmissionModel.findOne({ status: 'initial' })
        .populate('initialHealth')
      expect(status).toBe(201)
      expect(body).not.toBeNull()
      expect(admissionSaved).not.toBeNull()
      expect(admissionSaved.initialHealth).not.toBeNull()
    })
  })
})
