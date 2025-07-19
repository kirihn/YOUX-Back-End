import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { DeleteUserDto } from './dto/deleteUser.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from 'src/pipes/fileValidationPipe';
import multer from 'multer';

@ApiTags('Контроллер для работы с пользователями')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Получить список пользователей' })
  @Get('GetUsers')
  async GetUsers(
    @Query('page') page: number,
    @Query('countUsers') countUsers: number,
  ) {
    return this.userService.GetUsers(page, countUsers);
  }

  @ApiOperation({ summary: 'Создать пользователя' })
  @Post('CreateNewUser')
  @UseInterceptors(FileInterceptor('photo'))
  async CreateNewUser(
    @UploadedFile(
      new FileValidationPipe({
        maxSize: 10 * 1024 * 1024,
        required: true,
        allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'],
      }),
    )
    file: Express.Multer.File,
    @Body()
    createUserDto: CreateUserDto,
  ) {
    return this.userService.CreateNewUser(createUserDto, file);
  }

  @ApiOperation({ summary: 'Изменить пользователя' })
  @Put('UpdateUser')
  @UseInterceptors(FileInterceptor('photo'))
  async UpdateUser(
    @UploadedFile(
      new FileValidationPipe({
        maxSize: 10 * 1024 * 1024,
        required: false,
        allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'],
      }),
    )
    file: Express.Multer.File,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.UpdateUser(updateUserDto, file);
  }

  @ApiOperation({ summary: 'Удалить пользователя' })
  @Delete('DeleteUser')
  async DeleteUser(@Body() deleteUserDto: DeleteUserDto) {
    return this.userService.DeleteUser(deleteUserDto);
  }
}
