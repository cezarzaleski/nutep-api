export default class EmptyParamError extends Error {
  constructor (param: string) {
    super(`Empty parameter: ${param}`)
    this.name = 'EmptyParamError'
  }
}
