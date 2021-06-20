import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './modules/users/users.module';
import { PostgresDatabaseProviderModule } from './providers/postgres/provider.module';
import { RequestsModule } from './requests/requests.module';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
    }),
    PostgresDatabaseProviderModule,
    UsersModule,
    RequestsModule,
  ],
})
export class AppModule {}
