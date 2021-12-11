import User from 'src/authenticate/domain/entity/user';
import bcrypt from 'bcrypt'
import GeneratePassword from 'src/authenticate/domain/service/generate-password';

test("Should create a new user", async () => {
  const password = await GeneratePassword.generate('dummy')
  const user = new User('cezar.zaleski@gmail.com', password, 'teste', 'id-user');
  expect(user.getEmail().value).toEqual('cezar.zaleski@gmail.com')
  const comparePassword = await bcrypt.compare('dummy', user.getPassword())
  expect(comparePassword).toBeTruthy()
});
