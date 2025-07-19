import { Controller, Get, Post, Body, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { DeleteUserDto } from './dto/deleteUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('GetUsers')
  GetUsers(
    @Query('page') page: number,
    @Query('countUsers') countUsers: number,
  ) {
    return this.userService.GetUsers(page, countUsers);
  }

  @Post('CreateNewUser')
  CreateNewUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.CreateNewUser(createUserDto);
  }

  @Put('UpdateUser')
  UpdateUser(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.findOne(updateUserDto);
  }

  @Delete('DeleteUser')
  DeleteUser(@Body() deleteUserDto: DeleteUserDto) {
    return this.userService.remove(+id);
  }
}
