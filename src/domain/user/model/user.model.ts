const UserBrand: unique symbol = Symbol('User');

export class User {
  readonly [UserBrand]: void;

  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly createdAt: Date,
  ) {}
}
