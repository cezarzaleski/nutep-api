import mongoose from 'mongoose'
import InitialHealthRepository from 'src/admission/domain/repository/initial-health-repository'
import {
  MongoInitialHealthModel,
  MongoInitialHealthSchema
} from 'src/admission/infra/database/schemas/mongo-initial-health.schema'
import InitialHealth from 'src/admission/domain/entity/initial-health'
import NotFoundError from 'src/shared/exception/not-found'

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

  async findById (id: string): Promise<InitialHealth> {
    const initialHealthSchema: any = await this.initialHealthModel.findOne({ _id: id })
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (initialHealthSchema) return MongoInitialHealthSchema.toEntity(initialHealthSchema)
    throw new NotFoundError('initialHealth')
  }

  async update (id: string, initialHealth: InitialHealth): Promise<InitialHealth> {
    const initialHealthSchema: any = await this.initialHealthModel
      .findOneAndUpdate({ _id: id }, MongoInitialHealthSchema.toSchema(initialHealth))
    return MongoInitialHealthSchema.toEntity(initialHealthSchema)
  }
}
