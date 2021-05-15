import { Length, Min } from 'class-validator';

export class UserDto {
  @Length(20)
  name: string;

  @Min(18)
  age: number;
}

export class CreateUserDto extends UserDto {}

export class UpdateUserDto extends UserDto {}
