import UserRepository from 'src/authenticate/domain/repository/user-repository'
import User from 'src/authenticate/domain/entity/user'
import mongoose from 'mongoose'
import { MongoUserModel } from 'src/authenticate/infra/database/schemas/mongo-user.schema'
import NotFoundError from 'src/shared/exception/not-found'

export default class UserRepositoryDatabase implements UserRepository {
  private readonly userModel: mongoose.Model<mongoose.Document>
  constructor (
  ) {
    this.userModel = MongoUserModel
  }

  async findByEmail (email: string): Promise<User> {
    // @ts-expect-error
    const user: MongoUserSchema = await this.userModel.findOne({ email: email })
    if (user) {
      return new User(user.email, user.password, user.name, user._id)
    }
    throw new NotFoundError('User')
  }

  async findById (id: string): Promise<User> {
    // @ts-expect-error
    const user: MongoUserSchema = await this.userModel.findOne({ _id: id })
    if (user) {
      return new User(user.email, user.password, user.name, user._id)
    }
    throw new NotFoundError('User')
  }
}
