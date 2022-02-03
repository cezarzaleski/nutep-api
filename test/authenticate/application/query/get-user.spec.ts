import { mock, MockProxy } from 'jest-mock-extended'
import UserRepository from 'src/authenticate/domain/repository/user-repository'
import User from 'src/authenticate/domain/entity/user'
import faker from 'faker'
import GetUser from 'src/authenticate/application/query/get-user'
import NotFoundError from 'src/shared/exception/not-found'
import EmptyParamError from 'src/shared/exception/empty-param'

describe('Get User Query', () => {
  let userRepository: MockProxy<UserRepository>
  let user: User
  let sut: GetUser
  beforeAll(async () => {
    userRepository = mock()
    user = new User(faker.internet.email(), 'password', 'teste', 'id-user')
    sut = new GetUser(userRepository)
  })
  it('Should id user required', async () => {
    return sut.execute(undefined).catch(e => {
      expect(e).toEqual(new EmptyParamError('id'))
    }
    )
  })
  it('Should User not found', async () => {
    userRepository.findById.mockImplementation(() => {
      throw new NotFoundError('User')
    })
    return sut.execute('id').catch(e => {
      expect(e).toEqual(new NotFoundError('User'))
    }
    )
  })
  it('Should return user with success', async () => {
    userRepository.findById.mockResolvedValue(user)
    const userFind = await sut.execute('userId')
    expect(userFind.name).toEqual(user.name)
    expect(userFind.email).toEqual(user.getEmail().value)
    expect(userFind.id).toEqual(user.id)
  })
})
