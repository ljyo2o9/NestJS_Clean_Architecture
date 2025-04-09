import { Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY_TOKEN,
  UserRepository,
} from '../repository/user.repository.interface';
import { User } from '../model/user.model';
import { CreateUserCommand } from './command/create-user.command';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: CreateUserCommand): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(command.email);
    if (existingUser) {
      throw new Error('유저가 이미 존재함');
    }

    const userModel = new User({
      email: command.email,
      name: command.name,
      password: command.password,
    });

    const user = await this.userRepository.save(userModel);
    if (user != null) {
      return user;
    }

    throw new Error('유저 생성 실패');
  }
}
