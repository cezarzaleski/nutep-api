import UserRepository from 'src/authenticate/domain/repository/user-repository';

export default interface AbstractRepositoryFactory {
  createUserRepository: () => UserRepository
}
