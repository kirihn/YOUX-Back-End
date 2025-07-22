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
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from 'src/pipes/fileValidationPipe';

@ApiTags('Контроллер для работы с пользователями')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Получить список пользователей' })
  @Get('GetUserById')
  async GetUserById(@Query('userId') userId: string) {
    return this.userService.GetUserById(userId);
  }

  @ApiOperation({ summary: 'Получить список пользователей' })
  @Get('GetUsers')
  async GetUsers(
    @Query('pageIndex') pageIndex: number,
    @Query('countUsers') countUsers: number,
  ) {
    return this.userService.GetUsers(pageIndex, countUsers);
  }

  @ApiOperation({ summary: 'Создать пользователя' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateUserDto })
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
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateUserDto })
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
    @Query('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.UpdateUser(userId, updateUserDto, file);
  }

  @ApiOperation({ summary: 'Удалить пользователя' })
  @Delete('DeleteUser')
  async DeleteUser(@Body() deleteUserDto: DeleteUserDto) {
    return this.userService.DeleteUser(deleteUserDto);
  }
}
