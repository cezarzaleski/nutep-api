import mongoose from 'mongoose'
import request from 'supertest'
import { nestApp } from 'src/shared/infra/http/nestjs'
import { makeTestDb } from 'test/shared/infra/database/connection'
import { MongoPatientModel, MongoPatientSchema } from 'src/admission/infra/database/schemas/mongo-patient.schema'
import { CreatePatientInput } from 'src/shared/infra/http/nestjs/admission/input/create-patient-input'
import { Sex } from 'src/admission/domain/entity/sex'
import { HospitalizationStatus } from 'src/admission/domain/entity/hospitalization-status'
import Patient from 'src/admission/domain/entity/patient'
import PatientRepositoryDatabase from 'src/admission/infra/database/repository/patient-repository-database'

describe('Patient Router', () => {
  let app: any
  beforeAll(async () => {
    jest.setTimeout(1000)
    app = await nestApp()
    await app.init()
    await makeTestDb()
  })
  afterAll(async () => {
    await MongoPatientModel.deleteMany({})
    await mongoose.connection.close()
  })
  afterEach(async () => {
    await MongoPatientModel.deleteMany({})
  })
  describe('POST /api/patient', () => {
    const createPatientInput: CreatePatientInput = {
      fullName: 'fullname',
      birthday: '2021-11-11',
      sex: 'F',
      register: '1212',
      attendingPhysician: 'attendingPhysician',
      healthCare: 'healthCare'
    }
    it('should return 201 patient created', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post('/api/patients')
        .send(createPatientInput)
      // @ts-expect-error
      const patientSaved: MongoPatientSchema = await MongoPatientModel.findOne({ register: '1212' })
      expect(status).toBe(201)
      expect(body).not.toBeNull()
      expect(patientSaved.register).toEqual('1212')
    })
    it('should return 400 patient created', async () => {
      createPatientInput.birthday = '21/11/1988'
      const { status } = await request(app.getHttpServer())
        .post('/api/patients')
        .send(createPatientInput)
      // @ts-expect-error
      const patientSaved: MongoPatientSchema = await MongoPatientModel.findOne({ register: '1212' })
      expect(status).toBe(400)
      expect(patientSaved).toBeNull()
    })
  })
  describe('GET ALL /api/patients', () => {
    let patient: Patient
    beforeAll(async () => {
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
    })
    it('should return 200 find all patients none filter', async () => {
      const { status, body } = await request(app.getHttpServer())
        .get('/api/patients')
      expect(status).toBe(200)
      expect(body).not.toBeNull()
      expect(body[0].fullName).toEqual('dummy')
    })
  })
  describe('GET BY ID /api/patients/:id', () => {
    let patient: Patient
    beforeAll(async () => {
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
    })
    it('should return 200 find by id patients', async () => {
      const { status, body } = await request(app.getHttpServer())
        .get(`/api/patients/${patient.id}`)
      expect(status).toBe(200)
      expect(body).not.toBeNull()
      expect(body.fullName).toEqual('dummy')
    })
  })
  describe('UPDATE /api/patients/:id', () => {
    let patient: Patient
    beforeAll(async () => {
      const patientRepository = new PatientRepositoryDatabase()
      patient = new Patient(
        new mongoose.Types.ObjectId().toString(),
        'dummy-update',
        '2000-11-23',
        Sex.Masculine,
        HospitalizationStatus.OnAdmission,
        'hospitalId'
      )
      patient = await patientRepository.save(patient)
    })
    it('should return 200 patient updated', async () => {
      const createPatientInput: CreatePatientInput = {
        fullName: 'fullname update',
        birthday: '2021-11-11',
        sex: 'F',
        register: '1212',
        attendingPhysician: 'attendingPhysician',
        healthCare: 'healthCare'
      }
      const { status, body } = await request(app.getHttpServer())
        .put(`/api/patients/${patient.id}`)
        .send(createPatientInput)
      // @ts-expect-error
      const patientSaved: MongoPatientSchema = await MongoPatientModel.findOne({ _id: patient.id })
      expect(status).toBe(200)
      expect(body).not.toBeNull()
      expect(patientSaved.fullName).toEqual('fullname update')
    })
  })
})
