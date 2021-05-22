import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';

import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dtos/user.dto';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  all() {
    return this.usersRepository.find();
  }

  findUser(id: number) {
    return this.usersRepository.findOne(id);
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    const errors = await validate(user);

    if (errors.length > 0) throw new Error(`Validation failed!`);

    return this.usersRepository.save(user);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne(id);

    if (!user) return;

    const updatedUser = this.updateUserObject(user.id, updateUserDto);
    const errors = await validate(updatedUser);

    if (errors.length > 0) throw new Error(`Validation failed!`);

    return this.usersRepository.save(updatedUser);
  }

  async deleteUser(id: number) {
    const user = await this.usersRepository.findOne(id);

    if (!user) return;

    return await this.usersRepository.delete(user.id);
  }

  private updateUserObject(id: number, updateUserDto: UpdateUserDto): User {
    const { name, age } = updateUserDto;
    return new User(id, name, age);
  }
}
