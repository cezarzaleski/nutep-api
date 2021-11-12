import { Email } from '@/shared/domain/value-object/email';

export default class User {

  constructor(readonly email: Email, readonly password: string) {
  }
}
