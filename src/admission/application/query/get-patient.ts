import EmptyParamError from 'src/shared/exception/empty-param'
import PatientRepository from 'src/admission/domain/repository/patient-repository'
import GetPatientOutput from 'src/admission/application/dto/get-patient-output'

export default class GetPatient {
  constructor (readonly patientRepository: PatientRepository) {}

  async execute (id: string): Promise<GetPatientOutput> {
    if (!id) throw new EmptyParamError('id')
    const patient = await this.patientRepository.findById(id)
    return new GetPatientOutput(
      patient.id,
      patient.getFullName(),
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
