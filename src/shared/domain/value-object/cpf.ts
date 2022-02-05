import EmptyParamError from 'src/shared/exception/empty-param'

export default class Cpf {
  CPF_VALID_LENGTH = 11
  FACTOR_FIRST_VERIFIER_DIGIT = 10
  FACTOR_SECOND_VERIFIER_DIGIT = 11
  value: string

  private constructor (cpf: string) {
    if (!cpf) throw new EmptyParamError('cpf')
    if (!this.validate(cpf)) throw new Error('Invalid cpf')
    this.value = cpf
  }

  static create (cpf: string): Cpf {
    return new Cpf(cpf)
  }

  validate (rawCpf: string): boolean {
    if (!rawCpf) return false
    const cpf = this.cleanCpf(rawCpf)
    if (cpf.length !== this.CPF_VALID_LENGTH) return false
    if (this.areAllDigitsEqual(cpf)) return false
    const firstVerifierDigit = this.calculateDigit(cpf, this.FACTOR_FIRST_VERIFIER_DIGIT)
    const secondVerifierDigit = this.calculateDigit(cpf, this.FACTOR_SECOND_VERIFIER_DIGIT)
    const verifierDigit = this.extractVerifierDigit(cpf)
    const calculatedVerifiedDigit = `${firstVerifierDigit}${secondVerifierDigit}`
    return verifierDigit === calculatedVerifiedDigit
  }

  cleanCpf (cpf: string): string {
    return cpf.replace(/\D/g, '')
  }

  areAllDigitsEqual (cpf: string): boolean {
    const [firstDigit] = cpf
    return [...cpf].every(c => c === firstDigit)
  }

  calculateDigit (cpf: string, factor: number): number {
    let total = 0
    for (const digit of cpf) {
      if (factor > 1) total += parseInt(digit) * factor--
    }
    const rest = total % 11
    return (rest < 2) ? 0 : (11 - rest)
  }

  extractVerifierDigit (cpf: string): string {
    return cpf.slice(9)
  }
}
