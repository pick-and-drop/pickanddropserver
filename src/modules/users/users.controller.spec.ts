import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import * as faker from 'faker';

import { TestingProviderModule } from '../../providers/testing/provider.module';
import { UsersModule } from './users.module';
import { User } from './entities/user.entity';
import IUser from './interfaces/user.interface';

describe('UsersController', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TestingProviderModule, UsersModule],
    }).compile();

    userRepository = moduleRef.get('UserRepository');

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('GET /users', () => {

    const insertUser = () => {
      const user: IUser = {
        name: faker.name.findName(),
        age: 18,
        password: faker.internet.password(),
      };

      return userRepository.insert(user);
    };
    beforeEach(async () => {
      await insertUser();
      await insertUser();
      await insertUser();
    });

    it('responds 3 users', async () => {
      const response = await request(app.getHttpServer()).get('/users');

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(3);
    });

    afterEach(async () => {
      await userRepository.clear();
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
