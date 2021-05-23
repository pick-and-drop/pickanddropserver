import { Test } from '@nestjs/testing';
import UsersController from './users.controller';
import UserService from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PostgresDatabaseProviderModule } from '../../providers/postgres/provider.module';

describe('UserService', () => {
  let usersController: UsersController;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        PostgresDatabaseProviderModule,
        TypeOrmModule.forFeature([User]),
      ],
      controllers: [UsersController],
      providers: [UserService],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
  });

  describe('findAll', () => {
    beforeAll(() => {
      // create a user
      // create a user
      // create a user
    });

    it('should return 3 users', async () => {
      const users = await userService.all();
      expect(users.length).toBe(3);
    });
  });
});
