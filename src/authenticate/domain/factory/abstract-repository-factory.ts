import UserRepository from 'src/authenticate/domain/repository/usuario-repository';

export default interface AbstractRepositoryFactory {
	createUserRepository(): UserRepository;
}
