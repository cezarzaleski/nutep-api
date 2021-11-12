import { Email } from '@/shared/domain/value-object/email';

describe('Email',  () => {

  it('Should create email valid', () => {
    const email = Email.create('cezar.zaleski@gmail.com');
    expect(email.value).toBe('cezar.zaleski@gmail.com')
  })
})
