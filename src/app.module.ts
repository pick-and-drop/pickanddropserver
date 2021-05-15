import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './modules/users/users.module';

import { User } from './modules/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'aminrx',
      password: '123123',
      database: 'pickanddrop_development',
      entities: [User],
    }),
    UsersModule,
  ],
})
export class AppModule {}
