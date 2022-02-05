export default class PatientAdmission {
  private initialHealthId?: string

  constructor (
    readonly id: string,
    readonly patientId: string,
    readonly status: string
  ) {}

  setInitialHealth (initialHealthId?: string): PatientAdmission {
    this.initialHealthId = initialHealthId
    return this
  }

  getInitialHealthId (): string | undefined {
    return this.initialHealthId
  }
}
