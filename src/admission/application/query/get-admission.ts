import EmptyParamError from 'src/shared/exception/empty-param'
import PatientRepository from 'src/admission/domain/repository/patient-repository'
import AdmissionRepository from 'src/admission/domain/repository/admission-repository'
import GetAdmissionOutput from 'src/admission/application/dto/get-admission-output'
import InitialHealthRepository from 'src/admission/domain/repository/initial-health-repository'
import PatientOutput from 'src/admission/application/dto/patient-output'
import InitialHealthOutput from 'src/admission/application/dto/initial-health-output'

export default class GetAdmission {
  constructor (
    readonly admissionRepository: AdmissionRepository,
    readonly patientRepository: PatientRepository,
    readonly initialHealthRepository: InitialHealthRepository
  ) {}

  async execute (id: string): Promise<GetAdmissionOutput> {
    if (!id) throw new EmptyParamError('id')
    const admission = await this.admissionRepository.findById(id)
    const patient = await this.patientRepository.findById(admission.patientId)
    const patientOutput = new PatientOutput(
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
    const getAdmissionOutput = new GetAdmissionOutput(
      admission.id,
      patientOutput,
      admission.status
    )
    if (admission.getInitialHealthId()) {
      // @ts-expect-error
      const initialHealth = await this.initialHealthRepository.findById(admission.getInitialHealthId())
      getAdmissionOutput.initialHealth = new InitialHealthOutput(
        initialHealth.id,
        initialHealth.initialDescription,
        initialHealth.getConsciousnessLevels(),
        initialHealth.getDialysis(),
        initialHealth.getInsulin(),
        initialHealth.getOralDiet(),
        initialHealth.getDiagnostics(),
        initialHealth.getComorbidities(),
        initialHealth.getAllergies(),
        initialHealth.getLesion(),
        initialHealth.getMechanicalVentilation()
      )
    }
    return getAdmissionOutput
  }
}
