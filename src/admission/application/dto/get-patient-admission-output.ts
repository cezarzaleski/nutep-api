import PatientOutput from 'src/admission/application/dto/patient-output'
import InitialHealthOutput from 'src/admission/application/dto/initial-health-output'

export default class GetPatientAdmissionOutput {
  public initialHealth?: InitialHealthOutput
  constructor (
    readonly id: string,
    readonly patient: PatientOutput,
    readonly status: string
  ) {
  }
}
