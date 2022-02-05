import { makeTestDb } from 'test/shared/infra/database/connection'
import mongoose from 'mongoose'
import PatientRepositoryDatabase from 'src/admission/infra/database/repository/patient-repository-database'
import { Sex } from 'src/admission/domain/entity/sex'
import { HospitalizationStatus } from 'src/admission/domain/entity/hospitalization-status'
import { MongoPatientModel, MongoPatientSchema } from 'src/admission/infra/database/schemas/mongo-patient.schema'
import Patient from 'src/admission/domain/entity/patient'

beforeAll(async () => {
  await makeTestDb()
})
afterAll(async () => {
  await mongoose.connection.close()
})

describe('PatientRepositoryDatabase', () => {
  let sut: PatientRepositoryDatabase
  let patient: Patient
  beforeAll(async () => {
    sut = new PatientRepositoryDatabase()
    patient = new Patient(new mongoose.Types.ObjectId().toString(), 'fullName', '1988-11-21', Sex.Masculine,
      HospitalizationStatus.OnAdmission, 'hospitalId',
      '075.904.250-01', '121212', 'attendingPhysician', 'healthCare',
      'linkPhoto'
    )
  })

  afterAll(async () => {
    await MongoPatientModel.deleteMany({})
  })

  it('Should create patient', async () => {
    await sut.save(patient)
    // @ts-expect-error
    const patientSaved: MongoPatientSchema = await MongoPatientModel.findOne({ register: '121212' })
    expect(patientSaved.fullName).toEqual('fullName')
    expect(patientSaved.birthday).toEqual(new Date('1988-11-21'))
    expect(patientSaved.sex).toEqual(Sex.Masculine)
    expect(patientSaved.cpf).toEqual('075.904.250-01')
    expect(patientSaved.hospitalizationStatus).toEqual(HospitalizationStatus.OnAdmission)
    expect(patientSaved.register).toEqual('121212')
    expect(patientSaved.attendingPhysician).toEqual('attendingPhysician')
    expect(patientSaved.healthCare).toEqual('healthCare')
    expect(patientSaved.linkPhoto).toEqual('linkPhoto')
  })
})
