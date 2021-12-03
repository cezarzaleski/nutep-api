import { makeTestDb } from 'test/shared/infra/database/connection';
import UserRepositoryDatabase from 'src/authenticate/infra/database/repository/user-repository-database';
import { MongoUserModel } from 'src/authenticate/infra/database/schemas/mongo-user.schema';
import mongoose from "mongoose";


beforeAll(async () => {
  await makeTestDb()
})
afterAll(async () => {
  await mongoose.connection.close();
});


describe('UserRepositoryDatabase', () => {
  let sut: UserRepositoryDatabase
  let user: any
  beforeAll(async () => {
    sut = new UserRepositoryDatabase()
    user = {email: 'teste@gmail.com', password: 'dummy', name: 'teste'}
  })

  afterAll(async () => {
    await MongoUserModel.deleteMany({})
  })

  it('Should find user by email', async () => {
    await MongoUserModel.create(user)
    const result = await sut.findByEmail('teste@gmail.com')
    expect(result.name).toEqual('teste')
    expect(result.getPassword()).toEqual('dummy')
    expect(result.getEmail().value).toEqual('teste@gmail.com')
  })
})
