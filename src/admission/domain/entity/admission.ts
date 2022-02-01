import InitialHealth from 'src/admission/domain/entity/initial-health';

export default class Admission {
  private initialHealth?: InitialHealth

  constructor(
    readonly id: string,
    readonly patientId: string,
    readonly status: string
  ) {

  }
  setInitialHealth(initialHealth: InitialHealth): void { this.initialHealth = initialHealth}
  getInitialHealth() { return this.initialHealth}
}
