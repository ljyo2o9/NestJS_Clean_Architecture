const CreateUserCommandBrand: unique symbol = Symbol('CreateUserCommand');

export class CreateUserCommand {
  readonly [CreateUserCommandBrand]: void;

  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
  ) {}
}
