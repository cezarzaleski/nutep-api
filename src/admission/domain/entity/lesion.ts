import { validateYesOrNo, YesOrNo } from 'src/shared/domain/enum/yes-or-no'
import EmptyParamError from 'src/shared/exception/empty-param'

export default class Lesion {
  has: YesOrNo
  type?: string
  constructor (has?: string, type?: string) {
    if (!has) throw new EmptyParamError('has')
    validateYesOrNo(has, 'has')
    this.has = has as YesOrNo
    if (has === YesOrNo.Yes && !type) throw new EmptyParamError('type')
    this.type = type
  }
}
