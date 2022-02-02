import mongoose from 'mongoose';
import request from 'supertest';
import { nestApp } from 'src/shared/infra/http/nestjs';
import { makeTestDb } from 'test/shared/infra/database/connection';
import { MongoPatientModel, MongoPatientSchema } from 'src/admission/infra/database/schemas/mongo-patient.schema';
import { MongoAdmissionModel, MongoAdmissionSchema } from 'src/admission/infra/database/schemas/mongo-admission.schema';
import { InitialAdmissionInput, PatientInput } from 'src/admission/application/dto/initial-admission-input';
import Patient from 'src/admission/domain/entity/patient';
import PatientRepositoryDatabase from 'src/admission/infra/database/repository/patient-repository-database';
import { Sex } from 'src/admission/domain/entity/sex';
import { HospitalizationStatus } from 'src/admission/domain/entity/hospitalization-status';
import { v4 as uuidv4 } from 'uuid';
import Admission from 'src/admission/domain/entity/admission';
import AdmissionRepositoryDatabase from 'src/admission/infra/database/repository/admission-repository-database';

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
      patient: patientInput
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
  describe('GET ALL /api/admissions', () => {
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
      );
      patient = await patientRepository.save(patient)
      admission = new Admission(
        new mongoose.Types.ObjectId().toString(),
        patient.id,
        'initial'
      );
      admission = await admissionRepository.save(admission)
    })
    it('should return 200 find all admissions none filter', async () => {
      const { status, body } = await request(app.getHttpServer())
        .get('/api/admissions')
      // @ts-ignore
      expect(status).toBe(200)
      expect(body).not.toBeNull()
      expect(body[0].fullName).toEqual('dummy')
    })
  })
  describe('GET BY ID /api/admissions/:id', () => {
    let patient: Patient
    let admission: Admission
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
      );
      patient = await patientRepository.save(patient)
      admission = new Admission(
        new mongoose.Types.ObjectId().toString(),
        patient.id,
        'initial'
      );
      admission = await admissionRepository.save(admission)
    })
    it('should return 200 find by id patients', async () => {
      const { status, body } = await request(app.getHttpServer())
        .get(`/api/admissions/${admission.id}`)
      // @ts-ignore
      expect(status).toBe(200)
      expect(body).not.toBeNull()
      expect(body.fullName).toEqual('dummy')
    })
  })
  describe('UPDATE /api/patients/:id', () => {
    let patient: Patient
    let admission: Admission
    beforeAll(async () => {
      const patientRepository = new PatientRepositoryDatabase()
      const admissionRepository = new AdmissionRepositoryDatabase()
      patient = new Patient(
        new mongoose.Types.ObjectId().toString(),
        'dummy-update',
        '2000-11-23',
        Sex.Masculine,
        HospitalizationStatus.OnAdmission,
        uuidv4()
      );
      patient = await patientRepository.save(patient)
      admission = new Admission(
        new mongoose.Types.ObjectId().toString(),
        patient.id,
        'initial'
      );
      admission = await admissionRepository.save(admission)
    })
    it('should return 200 admission updated', async () => {
      let initialAdmissionInput: InitialAdmissionInput
      let patientInput: PatientInput
      patientInput = {
        fullName: 'fullname update',
        birthday: '2021-11-11',
        sex: 'F',
        register: '1212',
        attendingPhysician: 'attendingPhysician',
        healthCare: 'healthCare',
      }
      initialAdmissionInput = {patient: patientInput}
      const { status, body } = await request(app.getHttpServer())
        .put(`/api/admissions/${admission.id}`)
        .send(initialAdmissionInput)
      // @ts-ignore
      const patientSaved: MongoPatientSchema = await MongoPatientModel.findOne({_id: patient.id})
      expect(status).toBe(200)
      expect(body).not.toBeNull()
      expect(patientSaved.fullName).toEqual('fullname update')
    })
  })
})
