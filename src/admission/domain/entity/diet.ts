import EmptyParamError from 'src/shared/exception/empty-param'

export default class Diet {
  constructor (readonly product?: string, readonly proposed?: number, readonly infused?: number) {
    if (!product) throw new EmptyParamError('product')
    if (!proposed) throw new EmptyParamError('proposed')
    if (!infused) throw new EmptyParamError('infused')
  }
}
