import mongoose from 'mongoose'
import request from 'supertest'
import { nestApp } from 'src/shared/infra/http/nestjs'
import { makeTestDb } from 'test/shared/infra/database/connection'
import { MongoPatientModel } from 'src/admission/infra/database/schemas/mongo-patient.schema'
import { MongoAdmissionModel, MongoAdmissionSchema } from 'src/admission/infra/database/schemas/mongo-admission.schema'
import { MongoInitialHealthModel } from 'src/admission/infra/database/schemas/mongo-initial-health.schema'
import { InitialHealthInput } from 'src/admission/application/dto/initial-health-input'
import Admission from 'src/admission/domain/entity/admission'
import Patient from 'src/admission/domain/entity/patient'
import AdmissionRepositoryDatabase from 'src/admission/infra/database/repository/admission-repository-database'
import PatientRepositoryDatabase from 'src/admission/infra/database/repository/patient-repository-database'
import { Sex } from 'src/admission/domain/entity/sex'
import { HospitalizationStatus } from 'src/admission/domain/entity/hospitalization-status'
import { v4 as uuidv4 } from 'uuid'
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
    await MongoAdmissionModel.deleteMany({})
    await mongoose.connection.close()
  })
  afterEach(async () => {
    await MongoInitialHealthModel.deleteMany({})
    await MongoPatientModel.deleteMany({})
  })
  describe('POST /api/admissions/initial-health', () => {
    let admission: Admission
    let patient: Patient
    beforeAll(async () => {
      const admissionRepository = new AdmissionRepositoryDatabase()
      const patientRepository = new PatientRepositoryDatabase()
      patient = new Patient(
        new mongoose.Types.ObjectId().toString(),
        'dummy',
        '2000-11-23',
        Sex.Masculine,
        HospitalizationStatus.OnAdmission,
        uuidv4()
      )
      patient = await patientRepository.save(patient)
      admission = new Admission(
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
      ['allergies']
    )
    it('should return 201 patient initial admission', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post(`/api/initial-health/admission/${admission.id}`)
        .send(initialHealthInput)
      // @ts-expect-error
      const admissionSaved: MongoAdmissionSchema = await MongoAdmissionModel.findOne({ status: 'initial' })
        .populate('initialHealth')
      expect(status).toBe(201)
      expect(body).not.toBeNull()
      expect(admissionSaved).not.toBeNull()
      expect(admissionSaved.initialHealth).not.toBeNull()
    })
  })
})
