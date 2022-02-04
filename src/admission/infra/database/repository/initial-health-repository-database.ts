import mongoose from 'mongoose'
import InitialHealthRepository from 'src/admission/domain/repository/initial-health-repository'
import {
  MongoInitialHealthModel,
  MongoInitialHealthSchema
} from 'src/admission/infra/database/schemas/mongo-initial-health.schema'
import InitialHealth from 'src/admission/domain/entity/initial-health'

export default class InitialHealthRepositoryDatabase implements InitialHealthRepository {
  private readonly initialHealthModel: mongoose.Model<mongoose.Document>
  constructor (
  ) {
    this.initialHealthModel = MongoInitialHealthModel
  }

  async save (initialHealth: InitialHealth): Promise<InitialHealth> {
    const initialHealthSaved: any = await this.initialHealthModel.create(MongoInitialHealthSchema.toSchema(initialHealth))
    return MongoInitialHealthSchema.toEntity(initialHealthSaved)
  }
}
