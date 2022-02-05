import UserRepositoryDatabase from 'src/authenticate/infra/database/repository/user-repository-database'
import { httpResponseError, ok } from 'src/shared/infra/http/http'
import GetUser from 'src/authenticate/application/query/get-user'

export default class UserController {
  constructor (
    private readonly userRepository: UserRepositoryDatabase
  ) {}

  async findById (id: string): Promise<any> {
    try {
      const getUser = new GetUser(this.userRepository)
      const user = await getUser.execute(id)
      return ok(user)
    } catch (error) {
      return httpResponseError(error)
    }
  }
}
