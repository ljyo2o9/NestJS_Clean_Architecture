import { User } from '../model/user.model';

export const USER_REPOSITORY_TOKEN = 'USER_REPOSITORY_TOKEN';

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  save(name: string, email: string, password: string): Promise<User | null>;
}
