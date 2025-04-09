import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserRequestDto } from '../dto/request/create-user.dto';
import { UserService } from 'src/application/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() dto: CreateUserRequestDto) {
    return this.userService.createUser(dto);
  }
}
