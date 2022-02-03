import UserRepository from 'src/authenticate/domain/repository/user-repository'
import EmptyParamError from 'src/shared/exception/empty-param'
import UserDto from 'src/authenticate/application/dto/user-dto'

export default class GetUser {
  constructor (readonly userRepository: UserRepository) {}

  async execute (id?: string): Promise<UserDto> {
    if (!id) throw new EmptyParamError('id')
    const user = await this.userRepository.findById(id)
    return new UserDto(user.id, user.name, user.getEmail()?.value)
  }
}
