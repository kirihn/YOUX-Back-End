import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { DeleteUserDto } from './dto/deleteUser.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Контроллер для работы с пользователями')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Получить список пользователей' })
  @Get('GetUsers')
  GetUsers(
    @Query('page') page: number,
    @Query('countUsers') countUsers: number,
  ) {
    return this.userService.GetUsers(page, countUsers);
  }

  @ApiOperation({ summary: 'Создать пользователя' })
  @Post('CreateNewUser')
  CreateNewUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.CreateNewUser(createUserDto);
  }

  @ApiOperation({ summary: 'Изменить пользователя' })
  @Put('UpdateUser')
  UpdateUser(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.UpdateUser(updateUserDto);
  }

  @ApiOperation({ summary: 'Удалить пользователя' })
  @Delete('DeleteUser')
  DeleteUser(@Body() deleteUserDto: DeleteUserDto) {
    return this.userService.DeleteUser(deleteUserDto);
  }
}
