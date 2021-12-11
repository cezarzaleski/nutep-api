import PatientRepository from 'src/patient/domain/repository/patient-repository';
import CreatePatientInput from 'src/patient/application/dto/create-patient-input';
import Patient from 'src/patient/domain/entity/patient';
import { HospitalizationStatus } from 'src/patient/domain/entity/hospitalization-status';
import { v4 as uuidv4 } from 'uuid';

export default class CreatePatientHealth {
  private patientRepository: PatientRepository;

  constructor(patientRepository: PatientRepository) {
    this.patientRepository = patientRepository
  }

  async execute(input: CreatePatientInput): Promise<void> {
    const patient = new Patient(
      uuidv4(),
      input.fullName,
      input.birthday,
      input.sex,
      HospitalizationStatus.OnAdmission,
      input.cpf,
      input.register,
      input.attendingPhysician,
      input.healthCare,
      input.linkPhoto
    )
    await this.patientRepository.save(patient)
  }
}
