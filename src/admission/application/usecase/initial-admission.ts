import PatientRepository from 'src/admission/domain/repository/patient-repository';
import AdmissionRepository from 'src/admission/domain/repository/admission-repository';
import { InitialAdmissionInput, PatientInput } from 'src/admission/application/dto/initial-admission-input';
import Admission from 'src/admission/domain/entity/admission';
import mongoose from 'mongoose';

export default class InitialAdmission {
  private patientRepository: PatientRepository;
  private admissionRepository: AdmissionRepository;
  constructor(patientRepository: PatientRepository, admissionRepository: AdmissionRepository) {
    this.patientRepository = patientRepository
    this.admissionRepository = admissionRepository
  }
  async execute(input: InitialAdmissionInput): Promise<Admission> {
    const patientSaved = await this.patientRepository.save(PatientInput.toEntity(input.patient))
    const admission = new Admission(new mongoose.Types.ObjectId().toString(), patientSaved.id, 'initial')
    return await this.admissionRepository.save(admission)
  }
}
