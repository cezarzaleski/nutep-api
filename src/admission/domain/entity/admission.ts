export default class Admission {
  private initialHealthId?: string

  constructor (
    readonly id: string,
    readonly patientId: string,
    readonly status: string
  ) {}

  setInitialHealth (initialHealthId: string): void {
    this.initialHealthId = initialHealthId
  }

  getInitialHealthId (): string | undefined {
    return this.initialHealthId
  }
}
