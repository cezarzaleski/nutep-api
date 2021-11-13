import bcrypt from 'bcrypt'
import GeneratePassword from 'src/authenticate/domain/service/generate-password';


test("Should create a new password", async () => {
  const password = await GeneratePassword.generate('dummy');
  const compare = await bcrypt.compare('dummy', password)
  expect(compare).toBeTruthy()
});
