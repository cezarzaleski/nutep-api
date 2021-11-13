import { Email } from 'src/shared/domain/value-object/email';


export default class User {
  private readonly email: Email
  private readonly password: string

  constructor(email: string, password: string) {
    this.email = Email.create(email);
    this.password = password
  }
  getEmail() { return this.email}
  getPassword() { return this.password}
}
