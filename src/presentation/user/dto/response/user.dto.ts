import { User } from 'src/domain/user/model/user.model';

export class UserResponseDto {
  user: User;

  constructor(user: User) {
    this.user = user;
  }
}
