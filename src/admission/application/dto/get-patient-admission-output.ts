import PatientOutput from 'src/admission/application/dto/patient-output'
import InitialHealthOutput from 'src/admission/application/dto/initial-health-output'
import AdmissionOutput from 'src/admission/application/dto/admission-output'

export default class GetPatientAdmissionOutput {
  public initialHealth?: InitialHealthOutput
  public admission?: AdmissionOutput
  constructor (
    readonly id: string,
    readonly patient: PatientOutput,
    readonly status: string
  ) {
  }
}
