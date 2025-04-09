import { Injectable } from '@nestjs/common';
import { CreateUserCommand } from 'src/domain/user/usecase/command/create-user.command';
import { CreateUserUseCase } from 'src/domain/user/usecase/create-user.usecase';
import { CreateUserRequestDto } from 'src/presentation/user/dto/request/create-user.dto';
import { UserResponseDto } from 'src/presentation/user/dto/response/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async createUser(dto: CreateUserRequestDto) {
    const command = new CreateUserCommand(
      dto.name,
      dto.email,
      dto.password,
    );

    const user = await this.createUserUseCase.execute(command);
    return new UserResponseDto(user);
  }
}
