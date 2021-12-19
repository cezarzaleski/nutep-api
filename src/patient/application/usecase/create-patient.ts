import PatientRepository from 'src/patient/domain/repository/patient-repository';
import CreatePatientInput from 'src/patient/application/dto/create-patient-input';
import Patient from 'src/patient/domain/entity/patient';
import { HospitalizationStatus } from 'src/patient/domain/entity/hospitalization-status';
import { v4 as uuidv4 } from 'uuid';
import InvalidParamError from 'src/shared/exception/invalid-param';

export default class CreatePatient {
  private patientRepository: PatientRepository;

  constructor(patientRepository: PatientRepository) {
    this.patientRepository = patientRepository
  }

  async execute(input: CreatePatientInput): Promise<Patient> {
    const birthday = new Date(input.birthday);
    if (birthday.toString() === 'Invalid Date') throw new InvalidParamError('birthday')
    const patient = new Patient(
      uuidv4(),
      input.fullName,
      birthday,
      input.sex,
      HospitalizationStatus.OnAdmission,
      uuidv4(),
      input.cpf,
      input.register,
      input.attendingPhysician,
      input.healthCare,
      input.linkPhoto
    )
    return await this.patientRepository.save(patient)
  }
}
