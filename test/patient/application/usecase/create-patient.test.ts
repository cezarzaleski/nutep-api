import PatientRepository from 'src/patient/domain/repository/patient-repository';
import CreatePatient from 'src/patient/application/usecase/create-patient';
import PatientRepositoryDatabase from 'src/patient/infra/database/repository/patient-repository-database';
import CreatePatientInput from 'src/patient/application/dto/create-patient-input';
import { MongoPatientModel, MongoPatientSchema } from 'src/patient/infra/database/schemas/mongo-patient.schema';
import { HospitalizationStatus } from 'src/patient/domain/entity/hospitalization-status';

describe('Create Patient Usecase', () => {
  let sut: CreatePatient
  let patientRepository: PatientRepository
  let input: CreatePatientInput
  beforeAll(async () => {
    patientRepository = new PatientRepositoryDatabase()
    sut = new CreatePatient(patientRepository)
    input = new CreatePatientInput(
      'fullname',
      new Date('2000-11-23'),
      'F',
      '994.499.110-45',
      '121212',
      'attendingPhysician',
      'healthCare'
    )
  })
  it('Should create a new patient', async () => {
    expect(async () => {
      await sut.execute(input)
      // @ts-ignore
      const patientCreated: MongoPatientSchema = await MongoPatientModel.findOne({register: '121212'})
      expect(patientCreated.fullName).toEqual(input.fullName)
      expect(patientCreated.birthday).toEqual(input.birthday)
      expect(patientCreated.sex).toEqual(input.sex)
      expect(patientCreated.cpf).toEqual(input.cpf)
      expect(patientCreated.hospitalizationStatus).toEqual(HospitalizationStatus.OnAdmission)
      expect(patientCreated.register).toEqual(input.register)
      expect(patientCreated.attendingPhysician).toEqual(input.attendingPhysician)
      expect(patientCreated.healthCare).toEqual(input.healthCare)
    })
  })
})