import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { DeleteUserDto } from './dto/deleteUser.dto';
import { PrismaClient } from '@prisma/client';
import * as path from 'path';
import * as fs from 'fs';
import { promiseHooks } from 'v8';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaClient) {}
  async GetUsers(page: number, countUsers: number) {
    return `This action returns all user`;
  }

  async CreateNewUser(createUserDto: CreateUserDto, file: Express.Multer.File) {
    const uploadDir = path.join(process.cwd(), 'uploads', 'userAvatars');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const createdUser = await this.prisma.$transaction(async (prisma) => {
      const newUser = await prisma.user.create({
        data: {
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
          height: createUserDto.height,
          weight: createUserDto.weight,
          gender: createUserDto.gender,
          address: createUserDto.address,
          photo: 'uploads/defaults/errorUserAvatar.png',
        },
      });

      const fileName = newUser.id + '-avatar-' + file.originalname;
      const filePath = path.join(uploadDir, fileName);

      try {
        await fs.promises.writeFile(filePath, file.buffer);
      } catch (err) {
        throw new Error('Ошибка сохранения аватара: ' + err.message);
      }

      const updatedUser = await prisma.user.update({
        where: {
          id: newUser.id,
        },
        data: {
          photo: 'uploads/userAvatars/' + fileName,
        },
      });

      return updatedUser;
    });

    return createdUser;
  }

  async UpdateUser(UpdateUserDto: UpdateUserDto, file?: Express.Multer.File) {
    return `This action returns a # user`;
  }

  async DeleteUser(deleteUserDto: DeleteUserDto) {
    return `This action removes a # user`;
  }

  private async GetUsersValidation(page: number, countUsers: number) {
    return `This action returns all user`;
  }

  private async CreateNewUserValidation(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  private async UpdateUserValidation(UpdateUserDto: UpdateUserDto) {
    return `This action returns a # user`;
  }

  private async DeleteUserValidation(deleteUserDto: DeleteUserDto) {
    return `This action removes a # user`;
  }
}
