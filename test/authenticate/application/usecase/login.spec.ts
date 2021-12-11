import { mock, MockProxy } from 'jest-mock-extended';
import UserRepository from 'src/authenticate/domain/repository/user-repository';
import { Encrypter } from 'src/authenticate/infra/cryptography/encrypter';
import User from 'src/authenticate/domain/entity/user';
import faker from 'faker'
import GeneratePassword from 'src/authenticate/domain/service/generate-password';
import Login from 'src/authenticate/application/usecase/login';

describe('Login Usecase', () => {
  let sut: Login
  let userRepository: MockProxy<UserRepository>
  let encrypter: MockProxy<Encrypter>
  let user: User
  beforeAll(async () => {
    encrypter = mock()
    userRepository = mock()
    const password = await GeneratePassword.generate("dummy")
    user = new User(faker.internet.email(), password, 'teste', 'id-user')
    userRepository.findByEmail.mockResolvedValue(user)
    encrypter.encrypt.mockResolvedValue('encrypter')
    sut = new Login(userRepository, encrypter)
  })
  it('Should validate email required', async () => {
    expect(async () => {
      const promise = sut.execute(undefined, 'dummy')
      await expect(promise).rejects.toThrow('Empty parameter: email')
    })
  })
  it('Should validate password required', async () => {
    expect(async () => {
      const promise = sut.execute('teste@gmail.com', undefined)
      await expect(promise).rejects.toThrow('Empty parameter: password')
    })
  })
  it('Should return jwt with email and password valid', async () => {
    const token = await sut.execute('teste@gmail.com', 'dummy')
    await expect(token).toBe('encrypter')
  })
  it('Should throw unauthorized when email invalid', async () => {
    expect(async () => {
      const promise = sut.execute('teste@gmail.com.br', 'dummy')
      await expect(promise).rejects.toThrow('User or password invalid')
    })
  })
  it('Should throw unauthorized when password invalid', async () => {
    expect(async () => {
      const promise = sut.execute('teste@gmail.com', 'error')
      await expect(promise).rejects.toThrow('User or password invalid')
    })
  })
})
