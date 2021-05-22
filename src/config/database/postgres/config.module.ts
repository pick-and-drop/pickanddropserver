import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PostgresConfigService } from './config.service';

@Module({
  imports: [ConfigModule],
  providers: [PostgresConfigService],
  exports: [PostgresConfigService],
})
export class PostgresConfigModule {}
