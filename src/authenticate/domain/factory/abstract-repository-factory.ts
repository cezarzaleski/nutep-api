import UserRepository from '../repository/user-repository'

export default interface AbstractRepositoryFactory {
  createUserRepository: () => UserRepository
}
