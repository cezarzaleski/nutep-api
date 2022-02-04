export default class Admission {
  private initialHealthId?: string

  constructor (
    readonly id: string,
    readonly patientId: string,
    readonly status: string
  ) {}

  setInitialHealth (initialHealthId?: string): Admission {
    this.initialHealthId = initialHealthId
    return this
  }

  getInitialHealthId (): string | undefined {
    return this.initialHealthId
  }
}
