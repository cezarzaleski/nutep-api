import { Encrypter } from 'src/authenticate/infra/cryptography/encrypter';
import GeneratePassword from 'src/authenticate/domain/service/generate-password';
import UserRepository from 'src/authenticate/domain/repository/user-repository';
import EmptyParamError from 'src/shared/exception/empty-param';
import UnauthorizedError from 'src/authenticate/domain/exception/unauthorized';

export default class Login {
  private userRepository: UserRepository;
  private encrypter: Encrypter;

  constructor(userRepository: UserRepository, encrypter: Encrypter) {
    this.userRepository = userRepository
    this.encrypter = encrypter
  }

  async execute(email: string, password: string): Promise<string> {
    if (!email) throw new EmptyParamError('email')
    if (!password) throw new EmptyParamError('password')
    const user = await this.userRepository.findByEmail(email);
    const passwordValid = await GeneratePassword.compare(password, user.getPassword())
    if (passwordValid) return await this.encrypter.encrypt(user)
    throw new UnauthorizedError()
  }
}
