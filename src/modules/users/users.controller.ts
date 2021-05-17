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
  ParseIntPipe,
} from '@nestjs/common';

import { UpdateUserDto, CreateUserDto } from './dtos/user.dto';
import UserService from './user.service';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export default class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async index() {
    return await this.userService.all();
  }

  @Get(':id')
  show(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findUser(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe)
    id: number,
    @Body()
    updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  destroy(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
