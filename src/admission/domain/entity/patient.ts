import Cpf from 'src/shared/domain/value-object/cpf'
import EmptyParamError from 'src/shared/exception/empty-param'
import { Sex } from 'src/admission/domain/entity/sex'
import { HospitalizationStatus } from 'src/admission/domain/entity/hospitalization-status'
import InvalidParamError from 'src/shared/exception/invalid-param'

export default class Patient {
  private readonly cpf?: Cpf
  private readonly sex: Sex
  private readonly fullName: string
  private readonly hospitalizationStatus: HospitalizationStatus
  readonly birthday: Date

  constructor (
    readonly id: string,
    fullName?: string,
    birthday?: string,
    sex?: string,
    hospitalizationStatus?: string,
    hospitalId?: string,
    cpf?: string,
    readonly register?: string,
    readonly attendingPhysician?: string,
    readonly healthCare?: string,
    readonly linkPhoto?: string
  ) {
    if (!fullName) throw new EmptyParamError('fullName')
    if (!birthday) throw new EmptyParamError('birthday')
    if (!sex) throw new EmptyParamError('sex')
    if (!hospitalizationStatus) throw new EmptyParamError('hospitalizationStatus')
    if (!id) throw new EmptyParamError('id')
    if (cpf) this.cpf = Cpf.create(cpf)
    if (!Object.values(Sex).includes(sex as Sex)) throw new InvalidParamError('sex')
    if (!Object.values(HospitalizationStatus).includes(hospitalizationStatus as HospitalizationStatus)) throw new InvalidParamError('hospitalizationStatus')
    this.birthday = new Date(birthday)
    if (this.birthday.toString() === 'Invalid Date') throw new InvalidParamError('birthday')
    this.sex = sex as Sex
    this.fullName = fullName
    this.hospitalizationStatus = hospitalizationStatus as HospitalizationStatus
  }

  getFullName (): string { return this.fullName }
  getCpf (): Cpf | undefined { return this.cpf }
  getSex (): Sex { return this.sex }
  getHospitalizationStatus (): HospitalizationStatus { return this.hospitalizationStatus }
}
