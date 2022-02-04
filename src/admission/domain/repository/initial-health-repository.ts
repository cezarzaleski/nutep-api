import InitialHealth from 'src/admission/domain/entity/initial-health'

export default interface InitialHealthRepository {
  save: (initialHealth: InitialHealth) => Promise<InitialHealth>
  findById: (id: string) => Promise<InitialHealth>
  update: (id: string, initialHealth: InitialHealth) => Promise<InitialHealth>
}
