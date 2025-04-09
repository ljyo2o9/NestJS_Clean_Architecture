import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/user/model/user.model';
import { UserRepository } from 'src/domain/user/repository/user.repository.interface';
import { UserOrmEntity } from '../entity/user.orm-entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly userRepository: Repository<UserOrmEntity>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const userEntity = await this.userRepository.findOneBy({ email });
    return userEntity ? this.toUser(userEntity) : null;
  }

  async save(
    name: string,
    email: string,
    password: string,
  ): Promise<User | null> {
    const userEntity = this.toUserEntity({ name, email, password });
    const savedEntity = await this.userRepository.save(userEntity);
    return savedEntity ? this.toUser(savedEntity) : null;
  }

  private toUser(userEntity: UserOrmEntity): User {
    return new User(
      userEntity.id,
      userEntity.name,
      userEntity.email,
      userEntity.password,
      userEntity.createdAt,
    );
  }

  private toUserEntity(user: Partial<User>): UserOrmEntity {
    const userEntity = new UserOrmEntity();
    user.id ? (userEntity.id = user.id) : null;
    user.name ? (userEntity.name = user.name) : null;
    user.email ? (userEntity.email = user.email) : null;
    user.password ? (userEntity.password = user.password) : null;
    user.createdAt ? (userEntity.createdAt = user.createdAt) : null;
    return userEntity;
  }
}
