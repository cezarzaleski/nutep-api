import bcrypt from 'bcrypt'

export default class GeneratePassword {

  static async generate(password: string, salt = 12) {
    return bcrypt.hash(password, salt)
  }
}
