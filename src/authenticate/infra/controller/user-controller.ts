import UserRepositoryDatabase from 'src/authenticate/infra/database/repository/user-repository-database';
import { badRequest, ok, serverError, unauthorized } from 'src/shared/infra/http/http';
import InvalidEmailError from 'src/shared/exception/invalid-email';
import EmptyParamError from 'src/shared/exception/empty-param';
import NotFoundError from 'src/shared/exception/not-found';
import UnauthorizedError from 'src/authenticate/domain/exception/unauthorized';
import GetUser from 'src/authenticate/application/query/get-user';

export default class UserController {
  constructor(
    private readonly userRepository: UserRepositoryDatabase,
  ) {}

  async findById(id: string) {
    try {
      const getUser = new GetUser(this.userRepository)
      const user = await getUser.execute(id)
      return ok(user)
    }  catch (error) {
      if (error instanceof EmptyParamError || error instanceof InvalidEmailError || error instanceof NotFoundError) return badRequest(error)
      if (error instanceof UnauthorizedError) return unauthorized(error)
      return serverError(error)
    }
  }
}
