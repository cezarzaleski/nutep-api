import InvalidEmailError from 'src/shared/exception/invalid-email'

export class Email {
  value: string

  private constructor (email: string) {
    this.value = email
    Object.freeze(this)
  }

  static create (email: string): Email {
    if (!Email.validate(email)) {
      throw new InvalidEmailError(email)
    }
    return new Email(email)
  }

  static validate (email: string): boolean {
    const tester = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
    if (!email) {
      return false
    }
    if (email.length > 256) {
      return false
    }
    if (!tester.test(email)) {
      return false
    }
    const [account, address] = email.split('@')
    if (account.length > 64) {
      return false
    }
    const domainParts = address.split('.')
    return !domainParts.some(function (part) {
      return part.length > 63
    })
  }
}
