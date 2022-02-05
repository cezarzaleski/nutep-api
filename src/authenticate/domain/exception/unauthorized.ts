export default class UnauthorizedError extends Error {
  constructor () {
    super('User or password invalid')
    this.name = 'UnauthorizedError'
  }
}
