import { BadRequestException, Injectable } from '@nestjs/common';
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

  async CreateNewUser(createUser: CreateUserDto, file: Express.Multer.File) {
    const uploadDir = path.join(process.cwd(), 'uploads', 'userAvatars');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const createdUser = await this.prisma.$transaction(async (prisma) => {
      const newUser = await prisma.user.create({
        data: {
          firstName: createUser.firstName,
          lastName: createUser.lastName,
          height: createUser.height,
          weight: createUser.weight,
          gender: createUser.gender,
          address: createUser.address,
          photo: 'uploads/defaults/errorUserAvatar.png',
        },
      });

      const fileName =
        newUser.id + '-avatar' + path.extname(file.originalname);
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

  async UpdateUser(updatedUser: UpdateUserDto, file?: Express.Multer.File) {
    await this.UpdateUserValidation(updatedUser);

    const { id, ...fieldsToUpdate } = updatedUser;

    const user = await this.prisma.$transaction(async (prisma) => {
      if (file) {
        const uploadDir = path.join(process.cwd(), 'uploads', 'userAvatars');

        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        const fileName = id + '-avatar' + path.extname(file.originalname);
        const filePath = path.join(uploadDir, fileName);

        try {
          await fs.promises.writeFile(filePath, file.buffer);
        } catch (err) {
          throw new Error('Ошибка обновления аватара: ' + err.message);
        }

        fieldsToUpdate.photo = `uploads/userAvatars/${fileName}`;
      }

      const user = await prisma.user.update({
        where: { id: id },
        data: fieldsToUpdate,
      });

      return user;
    });

    return user;
  }

  async DeleteUser(deleteUser: DeleteUserDto) {
    return `This action removes a # user`;
  }

  private async GetUsersValidation(page: number, countUsers: number) {
    return `This action returns all user`;
  }

  private async UpdateUserValidation(UpdateUser: UpdateUserDto) {
    try {
      await this.prisma.user.findUniqueOrThrow({
        where: {
          id: UpdateUser.id,
        },
      });
    } catch {
      throw new BadRequestException('Пользователя с данным ID не существует');
    }
  }

  private async DeleteUserValidation(deleteUser: DeleteUserDto) {
    return `This action removes a # user`;
  }
}
