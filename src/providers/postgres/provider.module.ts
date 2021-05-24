import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostgresConfigService } from '../../config/database/postgres/config.service';
import { PostgresConfigModule } from '../../config/database/postgres/config.module';

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
        entities: [__dirname + '/../../modules/**/entities/*.entity{.ts,.js}'],
      }),
    }),
  ],
})
export class PostgresDatabaseProviderModule {}
