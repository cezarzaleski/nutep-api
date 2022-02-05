import mongoose from 'mongoose'
import request from 'supertest'
import { nestApp } from 'src/shared/infra/http/nestjs'
import { makeTestDb } from 'test/shared/infra/database/connection'
import { MongoPatientModel, MongoPatientSchema } from 'src/admission/infra/database/schemas/mongo-patient.schema'
import {
  MongoPatientAdmissionModel,
  MongoPatientAdmissionSchema
} from 'src/admission/infra/database/schemas/mongo-patient-admission.schema'
import { InitialAdmissionInput, PatientInput } from 'src/admission/application/dto/initial-admission-input'
import Patient from 'src/admission/domain/entity/patient'
import PatientRepositoryDatabase from 'src/admission/infra/database/repository/patient-repository-database'
import { Sex } from 'src/admission/domain/entity/sex'
import { HospitalizationStatus } from 'src/admission/domain/entity/hospitalization-status'
import PatientAdmission from 'src/admission/domain/entity/patient-admission'
import PatientAdmissionRepositoryDatabase
  from 'src/admission/infra/database/repository/patient-admission-repository-database'
import { FinalizeAdmissionInput } from 'src/admission/application/dto/finalize-admission-input'

describe('Patient Admissions Router', () => {
  let app: any
  beforeAll(async () => {
    jest.setTimeout(1000)
    app = await nestApp()
    await app.init()
    await makeTestDb()
  })
  afterAll(async () => {
    await MongoPatientModel.deleteMany({})
    await MongoPatientAdmissionModel.deleteMany({})
    await mongoose.connection.close()
  })
  afterEach(async () => {
    await MongoPatientAdmissionModel.deleteMany({})
    await MongoPatientModel.deleteMany({})
  })
  describe('POST /api/patient-admissions/initial', () => {
    const patientInput = new PatientInput(
      'fullname',
      '2021-11-11',
      'F',
      '432.270.380-13',
      '1212',
      'attendingPhysician'
    )
    const initialAdmissionInput: InitialAdmissionInput = {
      patient: patientInput
    }
    it('should return 201 patient initial admission', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post('/api/patient-admissions/initial')
        .send(initialAdmissionInput)
      // @ts-expect-error
      const patientSaved: MongoPatientSchema = await MongoPatientModel.findOne({ register: '1212' })
      // @ts-expect-error
      const admissionSaved: MongoPatientAdmissionSchema = await MongoPatientAdmissionModel.findOne({ status: 'initial' })
        .populate('patient')
      expect(status).toBe(201)
      expect(body).not.toBeNull()
      expect(patientSaved).not.toBeNull()
      expect(admissionSaved).not.toBeNull()
    })
  })
  describe('GET ALL /api/patient-admissions', () => {
    let admission: PatientAdmission
    let patient: Patient
    beforeAll(async () => {
      const patientAdmissionRepository = new PatientAdmissionRepositoryDatabase()
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
      admission = await patientAdmissionRepository.save(admission)
    })
    it('should return 200 find all admissions none filter', async () => {
      const { status, body } = await request(app.getHttpServer())
        .get('/api/patient-admissions')
      expect(status).toBe(200)
      expect(body).not.toBeNull()
      expect(body[0].fullName).toEqual('dummy')
    })
  })
  describe('GET BY ID /api/patient-admissions/:id', () => {
    let patient: Patient
    let admission: PatientAdmission
    beforeAll(async () => {
      const patientAdmissionRepository = new PatientAdmissionRepositoryDatabase()
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
      admission = await patientAdmissionRepository.save(admission)
    })
    it('should return 200 find by id admission', async () => {
      const { status, body } = await request(app.getHttpServer())
        .get(`/api/patient-admissions/${admission.id}`)
      expect(status).toBe(200)
      expect(body).not.toBeNull()
      expect(body.patient.fullName).toEqual('dummy')
    })
  })
  describe('UPDATE /api/patients/:id', () => {
    let patient: Patient
    let admission: PatientAdmission
    beforeAll(async () => {
      const patientRepository = new PatientRepositoryDatabase()
      const patientAdmissionRepository = new PatientAdmissionRepositoryDatabase()
      patient = new Patient(
        new mongoose.Types.ObjectId().toString(),
        'dummy-update',
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
      admission = await patientAdmissionRepository.save(admission)
    })
    it('should return 200 admission updated', async () => {
      const patientInput: PatientInput = {
        fullName: 'fullname update',
        birthday: '2021-11-11',
        sex: 'F',
        register: '1212',
        attendingPhysician: 'attendingPhysician',
        healthCare: 'healthCare'
      }
      const initialAdmissionInput: InitialAdmissionInput = { patient: patientInput }
      const { status, body } = await request(app.getHttpServer())
        .put(`/api/patient-admissions/${admission.id}`)
        .send(initialAdmissionInput)
      // @ts-expect-error
      const patientSaved: MongoPatientSchema = await MongoPatientModel.findOne({ _id: patient.id })
      expect(status).toBe(200)
      expect(body).not.toBeNull()
      expect(patientSaved.fullName).toEqual('fullname update')
    })
  })
  describe('POST /api/patient-admissions/:admissionId/finalize', () => {
    let patient: Patient
    let patientAdmission: PatientAdmission
    beforeAll(async () => {
      const patientRepository = new PatientRepositoryDatabase()
      const patientAdmissionRepository = new PatientAdmissionRepositoryDatabase()
      patient = new Patient(
        new mongoose.Types.ObjectId().toString(),
        'dummy-update',
        '2000-11-23',
        Sex.Masculine,
        HospitalizationStatus.OnAdmission,
        'hospitalId',
        '636.845.080-04',
        '1212'
      )
      patient = await patientRepository.save(patient)
      patientAdmission = new PatientAdmission(
        new mongoose.Types.ObjectId().toString(),
        patient.id,
        'initial'
      )
      patientAdmission = await patientAdmissionRepository.save(patientAdmission)
    })
    const finalizeAdmissionInput: FinalizeAdmissionInput = {
      hospitalId: 'hospitalId',
      utiId: 'utiId',
      bedId: 'bedId',
      typeNutritional: 'typeNutritional',
      foodInstrument: 'foodInstrument',
      dateInternation: new Date().toISOString(),
      dateInitialTherapy: new Date().toISOString(),
      medicalConducts: ['medicalConduct'],
      caloricGoal: { min: 1, max: 2 },
      proteinGoal: { min: 1, max: 2 },
      diets: [{ product: 'product', proposed: 1, infused: 2 }]
    }
    it('should return 201 patient finalize admission', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post(`/api/patient-admissions/${patientAdmission.id}/finalize`)
        .send(finalizeAdmissionInput)
      // @ts-expect-error
      const patientSaved: MongoPatientSchema = await MongoPatientModel.findOne({ register: '1212' })
      // @ts-expect-error
      const admissionSaved: MongoPatientAdmissionSchema = await MongoPatientAdmissionModel.findOne({ status: 'initial' })
        .populate('admission')
      expect(status).toBe(201)
      expect(body).not.toBeNull()
      expect(patientSaved).not.toBeNull()
      expect(admissionSaved.admission).not.toBeNull()
    })
  })
})
