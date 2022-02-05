import EmptyParamError from 'src/shared/exception/empty-param'

export default class Goal {
  min: number
  max: number

  constructor (min?: number, max?: number) {
    if (min === undefined) throw new EmptyParamError('min')
    if (max === undefined) throw new EmptyParamError('max')
    this.min = min
    this.max = max
  }
}
