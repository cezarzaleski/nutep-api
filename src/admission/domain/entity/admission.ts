import Diet from 'src/admission/domain/entity/diet'
import Goal from 'src/admission/domain/entity/goal'
import EmptyParamError from 'src/shared/exception/empty-param'

export default class Admission {
  private caloricGoal: Goal
  private proteinGoal: Goal
  private readonly diets: Diet[] = []
  private readonly dateInternation?: Date
  private readonly dateInitialTherapy?: Date
  private readonly medicalConducts: string[] = []
  constructor (
    readonly id: string,
    readonly hospitalId?: string,
    readonly utiId?: string,
    readonly bedId?: string,
    readonly typeNutritional?: string,
    readonly foodInstrument?: string,
    dateInternation?: string,
    dateInitialTherapy?: string
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

  addDiets (diets?: Diet[]): Admission {
    if (!diets || !diets.length) return this
    diets.forEach(diet => this.addDiet(new Diet(diet.product, diet.proposed, diet.infused)))
    return this
  }

  addDiet (diet: Diet): Admission {
    this.diets.push(diet)
    return this
  }

  addMedicalConductss (medicalConducts?: string[]): Admission {
    if (!medicalConducts || !medicalConducts.length) return this
    medicalConducts.forEach(medicalConduct => this.addMedicalConduct(medicalConduct))
    return this
  }

  addMedicalConduct (medicalConduct: string): void {
    this.medicalConducts.push(medicalConduct)
  }

  getCaloricGoal (): Goal { return this.caloricGoal }
  getProteinGoal (): Goal { return this.proteinGoal }
  getDiets (): Diet[] { return this.diets }
  getDateInitialTherapy (): Date | undefined { return this.dateInitialTherapy }
  getDateInternation (): Date | undefined { return this.dateInternation }
  getMedicalConducts (): string[] { return this.medicalConducts }
}
