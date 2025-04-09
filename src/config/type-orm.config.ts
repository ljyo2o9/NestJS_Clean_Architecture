import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvKey } from 'src/common/enum/env.key';

export const typeOrmModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'mysql',
    host: configService.get(EnvKey.DB_HOST),
    port: configService.get(EnvKey.DB_PORT),
    username: configService.get(EnvKey.DB_USERNAME),
    password: configService.get(EnvKey.DB_PASSWORD),
    database: configService.get(EnvKey.DB_DATABASE),
    autoLoadEntities: true,
    synchronize: true,
  }),
});
