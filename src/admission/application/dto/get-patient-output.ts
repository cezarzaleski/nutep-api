export default class GetPatientOutput {
  constructor (
    readonly id: string,
    readonly fullName: string,
    readonly birthday: Date,
    readonly sex: string,
    readonly cpf?: string,
    readonly register?: string,
    readonly attendingPhysician?: string,
    readonly healthCare?: string,
    readonly linkPhoto?: string
  ) {
  }
}
