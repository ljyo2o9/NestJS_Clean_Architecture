import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from 'src/application/user/user.service';
import { CreateUserUseCase } from 'src/domain/user/usecase/create-user.usecase';
import { USER_REPOSITORY_TOKEN } from 'src/domain/user/repository/user.repository.interface';
import { UserOrmRepository } from 'src/infrastructure/database/repository/user.orm-repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from 'src/infrastructure/database/entity/user.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  controllers: [UserController],
  providers: [
    UserService,
    CreateUserUseCase,
    { provide: USER_REPOSITORY_TOKEN, useClass: UserOrmRepository },
  ],
})
export class UserModule {}
