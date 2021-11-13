import bcrypt from 'bcrypt'

export default class GeneratePassword {

  static async generate(password: string, salt = 12): Promise<string> {
    return bcrypt.hash(password, salt)
  }

  static async compare(plaitext: string, digest: string): Promise<boolean> {
    return bcrypt.compare(plaitext, digest)
  }
}
