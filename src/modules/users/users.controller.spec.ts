import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import * as faker from 'faker';

import { TestingProviderModule } from '../../providers/testing/provider.module';
import { UsersModule } from './users.module';
import { User } from './entities/user.entity';
import UsersController from './users.controller';

describe('UserService', () => {
  let usersController: UsersController;
  let userRepository: Repository<User>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TestingProviderModule, UsersModule],
    }).compile();

    userRepository = moduleRef.get('UserRepository');
    usersController = moduleRef.get<UsersController>(UsersController);
  });

  describe('all', () => {
    beforeEach(async () => {
      await userRepository.insert({
        name: faker.name.findName(),
        age: 18,
        password: faker.internet.password(),
      });
      await userRepository.insert({
        name: faker.name.findName(),
        age: 18,
        password: faker.internet.password(),
      });
      await userRepository.insert({
        name: faker.name.findName(),
        age: 18,
        password: faker.internet.password(),
      });
    });

    afterEach(async () => {
      await userRepository.clear();
    });

    it('should return 3 users', async () => {
      const users = await usersController.index();

      expect(users.length).toBe(3);
    });

    it('should return 3 users', async () => {
      const users = await usersController.index();

      expect(users.length).toBe(3);
    });
  });
});
