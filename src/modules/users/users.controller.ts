import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import IUser from './interfaces/user.interface';
import { UpdateUserDto, CreateUserDto } from './dtos/user.dto';
import UserService from './user.service';

@Controller('users')
export default class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async index() {
    return await this.userService.all();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  show(@Param('id') id: string) {
    return this.userService.findUser(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): IUser {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  destroy(@Param('id') id: string): IUser {
    return this.userService.deleteUser(id);
  }
}
