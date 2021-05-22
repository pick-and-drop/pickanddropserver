import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './modules/users/users.module';
import { PostgresDatabaseProviderModule } from './config/database/postgres/provider.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PostgresDatabaseProviderModule,
    UsersModule,
  ],
})
export class AppModule {}
