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
  HttpException,
  HttpStatus,
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
  async show(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findUser(id);

    if (!user) throw new HttpException('NO_CONTENT', HttpStatus.NO_CONTENT);

    return user;
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
