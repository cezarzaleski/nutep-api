import InitialHealth from 'src/admission/domain/entity/initial-health'

export default class Admission {
  private readonly initialHealth?: InitialHealth

  constructor (
    readonly id: string,
    readonly patientId: string,
    readonly status: string
  ) {

  }
}
