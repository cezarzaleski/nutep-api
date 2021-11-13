import User from 'src/authenticate/domain/entity/user';

export default interface UserRepository {
  findByEmail(email: string): Promise<User>
}
