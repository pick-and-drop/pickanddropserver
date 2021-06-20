import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import * as faker from 'faker';

import { TestingProviderModule } from '../../providers/testing/provider.module';
import { UsersModule } from './users.module';
import { User } from './entities/user.entity';
import IUser from './interfaces/user.interface';
import { serialize, plainToClass } from 'class-transformer';

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

  describe('GET /users/:id', () => {
    let user: User;

    beforeEach(async () => {
      const userCreated = userRepository.create({
        name: faker.name.findName(),
        age: 18,
        password: faker.internet.password(),
      });

      user = await userRepository.save(userCreated);
    });

    it('response the user', async () => {
      const response = await request(app.getHttpServer()).get(
        `/users/${user.id}`,
      );

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(JSON.parse(serialize(user)));
    });

    it('should not response a user', async () => {
      const response = await request(app.getHttpServer()).get(
        `/users/${user.id + 1}`,
      );

      expect(response.status).toBe(204);
      expect(response.body).toMatchObject({});
    });

    afterEach(async () => {
      await userRepository.clear();
    });
  });

  describe('POST /users', () => {
    it('responses a user created', async () => {
      const userBody = {
        name: 'caleb caleb xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        age: 18,
        password: faker.internet.password(),
      };

      const response = await request(app.getHttpServer())
        .post(`/users`)
        .send(userBody);

      expect(response.status).toBe(201);
    });

    it('responses error 500 if the validation is not correct', async () => {
      const userBody = {
        name: faker.name.findName(),
        age: 18,
        password: faker.internet.password(),
      };

      const response = await request(app.getHttpServer())
        .post(`/users`)
        .send(userBody);

      expect(response.status).toBe(500);
    });

    afterEach(async () => {
      await userRepository.clear();
    });
  });

  afterAll(async () => {
    await app.close();
  });

  describe('PUT /users/:id', () => {
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
      const userBody = {
        name: 'caleb caleb xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        age: 18,
        password: faker.internet.password(),
      };
      const response = await request(app.getHttpServer())
        .put(`/users/${user.id}`)
        .send(userBody);

      expect(response.status).toBe(200);
    });

    it('should response a error 500', async () => {
      const userBody = {
        name: 'caleb caleb',
        age: 18,
        password: faker.internet.password(),
      };
      const response = await request(app.getHttpServer())
        .put(`/users/${user.id}`)
        .send(userBody);

      expect(response.status).toBe(500);
    });

    afterEach(async () => {
      await userRepository.clear();
    });
  });

  describe('DELETE /users/:id', () => {
    let user: User;

    beforeEach(async () => {
      const userCreated = userRepository.create({
        name: faker.name.findName(),
        age: 18,
        password: faker.internet.password(),
      });

      user = await userRepository.save(userCreated);
    });

    it('should delete the user', async () => {
      const response = await request(app.getHttpServer()).delete(
        `/users/${user.id}`,
      );

      expect(response.status).toBe(200);
    });

    it('should response a error 500', async () => {
      const response = await request(app.getHttpServer()).delete(
        `/users/${user.id + 1}`,
      );

      expect(response.status).toBe(204);
    });

    afterEach(async () => {
      await userRepository.clear();
    });
  });
});
