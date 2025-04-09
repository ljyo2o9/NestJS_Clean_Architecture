const UserBrand: unique symbol = Symbol('User');

export class User {
  readonly [UserBrand]: void;

  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;

  constructor(params: Partial<User>) {
    Object.assign(this, params);
  }
}
