import User from '@/authenticate/domain/entity/user';
import { Email } from '@/shared/domain/value-object/email';


test("Should create a new patient", () => {
    const professional = new User(Email.create('cezar.zaleski@gmail.com'), 'dummy');
    expect(professional).toBeDefined()
});
