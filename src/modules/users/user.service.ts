import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

import IUser from './interfaces/user.interface';
import { CreateUserDto, UpdateUserDto } from './dtos/user.dto';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  private users: IUser[] = [{ name: 'amin', age: 18 }];

  all(): Promise<IUser[]> {
    return this.usersRepository.find();
  }

  findUser(id: string): IUser {
    const idNumber: number = parseInt(id);
    return this.users[idNumber - 1];
  }

  createUser(createUserDto: CreateUserDto) {
    this.usersRepository.insert(createUserDto);
  }

  updateUser(id: string, updateUserDto: UpdateUserDto): IUser {
    const idNumber: number = parseInt(id);
    this.users[idNumber - 1] = updateUserDto;
    return this.users[idNumber - 1];
  }

  deleteUser(id: string): IUser {
    const idNumber: number = parseInt(id);
    return this.users.splice(idNumber - 1, 1)[0];
  }
}
