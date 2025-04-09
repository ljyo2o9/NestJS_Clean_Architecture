import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/user/model/user.model';
import { UserRepository } from 'src/domain/user/repository/user.repository.interface';
import { UserOrmEntity } from '../entity/user.orm-entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserOrmRepository implements UserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly userRepository: Repository<UserOrmEntity>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const userEntity = await this.userRepository.findOneBy({ email });
    return userEntity ? this.toUser(userEntity) : null;
  }

  async save(user: User): Promise<User | null> {
    const userEntity = this.toUserEntity(user);
    const savedEntity = await this.userRepository.save(userEntity);
    return savedEntity ? this.toUser(savedEntity) : null;
  }

  private toUser(userEntity: UserOrmEntity): User {
    return new User({
      id: userEntity.id,
      name: userEntity.name,
      email: userEntity.email,
      password: userEntity.password,
      createdAt: userEntity.createdAt,
    });
  }

  private toUserEntity(user: User): UserOrmEntity {
    const userEntity = new UserOrmEntity();
    userEntity.id = user.id;
    userEntity.name = user.name;
    userEntity.email = user.email;
    userEntity.password = user.password;
    userEntity.createdAt = user.createdAt;
    return userEntity;
  }
}
