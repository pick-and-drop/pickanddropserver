import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import * as faker from 'faker';

import UserService from './user.service';
import { TestingProviderModule } from '../../providers/testing/provider.module';
import { UsersModule } from './users.module';
import { User } from './entities/user.entity';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TestingProviderModule, UsersModule],
    }).compile();

    userRepository = moduleRef.get('UserRepository');
    userService = moduleRef.get<UserService>(UserService);
  });

  describe('findAll', () => {
    console.log(faker.datatype.number())
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
      const users = await userService.all();

      expect(users.length).toBe(3);
    });
  });
});
