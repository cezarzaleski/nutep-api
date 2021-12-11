import UserRepository from 'src/authenticate/domain/repository/user-repository';
import EmptyParamError from 'src/shared/exception/empty-param';
import User from 'src/authenticate/domain/entity/user';

export default class GetUser {
  constructor(readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<User> {
    if (!id) throw new EmptyParamError('id')
    return this.userRepository.findById(id);
  }
}
