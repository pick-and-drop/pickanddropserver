import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { PostgresDatabaseProviderModule } from '../postgres/provider.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.test',
    }),
    PostgresDatabaseProviderModule,
  ],
})
 export class TestingProviderModule {}
