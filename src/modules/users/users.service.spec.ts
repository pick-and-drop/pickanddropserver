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

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TestingProviderModule, UsersModule],
    }).compile();

    userRepository = moduleRef.get('UserRepository');
    userService = moduleRef.get<UserService>(UserService);
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
      const users = await userService.all();

      expect(users.length).toBe(3);
    });

    it('should return 3 users', async () => {
      const users = await userService.all();

      expect(users.length).toBe(3);
    });
  });

  describe('find', () => {
    let user: User;

    beforeEach(async () => {
      const userCreated = userRepository.create({
        name: faker.name.findName(),
        age: 18,
        password: faker.internet.password(),
      });

      user = await userRepository.save(userCreated);
    });

    afterEach(async () => {
      await userRepository.clear();
    });

    it('should return user', async () => {
      const userFound = userService.findUser(user.id);

      expect(userFound).toBeDefined();
    });
  });

  describe('create', () => {
    it('should create user', async () => {
      const createUserDto = {
        name: 'Caleb caleb xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        age: 18,
        password: faker.internet.password(),
      };
      const user = await userService.createUser(createUserDto);

      expect(user).toBeDefined();
    });

    it('should not created a user', async () => {
      const createUserDto = {
        name: 'Caleb caleb',
        age: 18,
        password: faker.internet.password(),
      };

      const user = async () => {
        await userService.createUser(createUserDto);
      };

      await expect(user).rejects.toThrow();
    });

    afterEach(async () => {
      await userRepository.clear();
    });
  });

  describe('update', () => {
    let user: User;

    beforeEach(async () => {
      const userCreated = userRepository.create({
        name: faker.name.findName(),
        age: 18,
        password: faker.internet.password(),
      });

      user = await userRepository.save(userCreated);
    });

    it('should update the user', async () => {
      const updateUserDto = {
        name: 'Caleb caleb xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        age: 18,
        password: faker.internet.password(),
      };

      const userUpdated = await userService.updateUser(user.id, updateUserDto);

      expect(userUpdated.name).toBe(updateUserDto.name);
    });

    it('should update the user', async () => {
      const updateUserDto = {
        name: 'Caleb caleb xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        age: 18,
        password: faker.internet.password(),
      };

      const userUpdated = await userService.updateUser(
        user.id + 1,
        updateUserDto,
      );

      expect(userUpdated).toBeUndefined();
    });

    it('should response a error', async () => {
      const updateUserDto = {
        name: 'Caleb caleb',
        age: 18,
        password: faker.internet.password(),
      };

      const userUpdated = async () => {
        await userService.updateUser(user.id, updateUserDto);
      };

      await expect(userUpdated).rejects.toThrow();
    });

    afterEach(async () => {
      await userRepository.clear();
    });
  });

  describe('delete', () => {
    let user: User;

    beforeEach(async () => {
      const userCreated = userRepository.create({
        name: faker.name.findName(),
        age: 18,
        password: faker.internet.password(),
      });

      user = await userRepository.save(userCreated);
    });

    it('should delete user', async () => {
      const userDeleted = await userService.deleteUser(user.id);

      expect(userDeleted).toBeDefined();
    });

    it('should not response a user', async () => {
      const userDeleted = await userService.deleteUser(user.id + 1);

      expect(userDeleted).toBeUndefined();
    });

    afterEach(async () => {
      await userRepository.clear();
    });
  });
});
