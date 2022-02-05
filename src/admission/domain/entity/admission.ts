import Diet from 'src/admission/domain/entity/diet'
import Goal from 'src/admission/domain/entity/goal'
import EmptyParamError from 'src/shared/exception/empty-param'

export default class Admission {
  private caloricGoal: Goal
  private proteinGoal: Goal
  private diet: Diet
  private readonly dateInternation?: Date
  private readonly dateInitialTherapy?: Date
  constructor (
    readonly id: string,
    readonly hospitalId?: string,
    readonly utiId?: string,
    readonly bedId?: string,
    readonly typeNutritional?: string,
    readonly foodInstrument?: string,
    dateInternation?: string,
    dateInitialTherapy?: string,
    readonly medicalConduct?: string
  ) {
    if (!hospitalId) throw new EmptyParamError('hospital')
    if (!utiId) throw new EmptyParamError('utiId')
    if (!bedId) throw new EmptyParamError('bedId')
    if (dateInternation) {
      this.dateInternation = new Date(dateInternation)
    }
    if (dateInitialTherapy) {
      this.dateInitialTherapy = new Date(dateInitialTherapy)
    }
  }

  setCaloricGoal (min?: number, max?: number): Admission {
    this.caloricGoal = new Goal(min, max)
    return this
  }

  setProteinGoal (min?: number, max?: number): Admission {
    this.proteinGoal = new Goal(min, max)
    return this
  }

  setDiet (diet: Diet): Admission {
    this.diet = diet
    return this
  }

  getCaloricGoal (): Goal { return this.caloricGoal }
  getProteinGoal (): Goal { return this.proteinGoal }
  getDiet (): Diet { return this.diet }
  getDateInitialTherapy (): Date | undefined { return this.dateInitialTherapy }
  getDateInternation (): Date | undefined { return this.dateInternation }
}
