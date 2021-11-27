import Login from 'src/authenticate/application/usecase/login';
import UserRepositoryDatabase from 'src/authenticate/infra/database/repository/user-repository-database';
import { JwtAdapter } from 'src/authenticate/infra/cryptography/jwt-adapter';
import { badRequest, ok, serverError, unauthorized } from 'src/shared/infra/http/http';
import InvalidEmailError from 'src/shared/exception/invalid-email';
import EmptyParamError from 'src/shared/exception/empty-param';
import NotFoundError from 'src/shared/exception/not-found';
import UnauthorizedError from 'src/authenticate/domain/exception/unauthorized';

export default class AuthController {
  constructor(
    private readonly userRepository: UserRepositoryDatabase,
    private readonly encrypter: JwtAdapter
  ) {}

  async authenticate(email: string, password: string) {
    try {
      const login = new Login(this.userRepository, this.encrypter)
      const token =  await login.execute(email, password)
      return ok({token})
    }  catch (error) {
      if (error instanceof EmptyParamError || error instanceof InvalidEmailError || error instanceof NotFoundError) return badRequest(error)
      if (error instanceof UnauthorizedError) return unauthorized(error)
      return serverError(error)
    }
  }
}
