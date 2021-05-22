import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostgresConfigService } from './config.service';
import { PostgresConfigModule } from './config.module';
import { User } from '../../../modules/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [PostgresConfigModule],
      inject: [PostgresConfigService],
      useFactory: (postgresConfigService: PostgresConfigService) => ({
        type: 'postgres',
        host: postgresConfigService.host,
        port: postgresConfigService.port,
        username: postgresConfigService.user,
        password: postgresConfigService.password,
        database: postgresConfigService.name,
        entities: [User],
      }),
    }),
  ],
})
export class PostgresDatabaseProviderModule {}
