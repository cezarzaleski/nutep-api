import User from 'src/authenticate/domain/entity/user';
import { Email } from 'src/shared/domain/value-object/email';


test("Should create a new user", () => {
    const professional = new User(Email.create('cezar.zaleski@gmail.com'), 'dummy');
    expect(professional).toBeDefined()
});
