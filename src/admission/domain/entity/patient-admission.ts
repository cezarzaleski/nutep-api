export default class PatientAdmission {
  private initialHealthId?: string
  private admissionId?: string

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

  setAdmissionId (admissionId?: string): PatientAdmission {
    this.admissionId = admissionId
    return this
  }

  getAdmissionId (): string | undefined {
    return this.admissionId
  }
}
