import EmptyParamError from 'src/shared/exception/empty-param';
import PatientRepository from 'src/admission/domain/repository/patient-repository';
import GetPatientOutput from 'src/admission/application/dto/get-patient-output';
import AdmissionRepository from 'src/admission/domain/repository/admission-repository';

export default class GetAdmission {
  constructor(
    readonly admissionRepository: AdmissionRepository,
    readonly patientRepository: PatientRepository
  ) {}

  async execute(id: string): Promise<GetPatientOutput> {
    if (!id) throw new EmptyParamError('id')
    const admission = await this.admissionRepository.findById(id);
    const patient = await this.patientRepository.findById(admission.patientId);
    return new GetPatientOutput(
      patient.id,
      patient.fullName,
      patient.birthday,
      patient.getSex(),
      patient.getCpf()?.value,
      patient?.register,
      patient?.attendingPhysician,
      patient?.healthCare,
      patient?.linkPhoto
      )
  }
}
