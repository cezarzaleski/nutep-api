import { Email } from 'src/shared/domain/value-object/email'

export default class User {
  private readonly email: Email
  private readonly password: string

  constructor (email: string, password: string, readonly name: string, readonly id: string) {
    this.email = Email.create(email)
    this.password = password
  }

  getEmail (): Email { return this.email }
  getPassword (): string { return this.password }
}
