import { Email } from 'src/shared/domain/value-object/email';
import InvalidEmailError from 'src/shared/exception/invalid-email';


describe('Email',  () => {

  it('Should create email valid', () => {
    const email = Email.create('cezar.zaleski@gmail.com');
    expect(email.value).toBe('cezar.zaleski@gmail.com')
  })

  it('Should throw to invalid-email', () => {
    expect(() => Email.create('cezar.zaleski')).toThrow(new InvalidEmailError("cezar.zaleski"));
  })
})
