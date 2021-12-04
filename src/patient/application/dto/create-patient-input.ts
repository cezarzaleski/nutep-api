export default class CreatePatientInput {
  constructor(
    readonly fullName: string,
    readonly birthday: Date,
    readonly sex: string,
    readonly cpf?: string,
    readonly register?: string,
    readonly attendingPhysician?: string,
    readonly healthCare?: string,
    readonly linkPhoto?: string
  ) {}
}
