import { Module } from '@nestjs/common';
import { configModule } from './config/config';
import { typeOrmModule } from './config/type-orm.config';
import { UserModule } from './presentation/user/user.module';

@Module({
  imports: [configModule, typeOrmModule, UserModule],
})
export class AppModule {}
