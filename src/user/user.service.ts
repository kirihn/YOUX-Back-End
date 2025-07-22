import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { DeleteUserDto } from './dto/deleteUser.dto';
import { PrismaClient } from '@prisma/client';
import * as path from 'path';
import * as fs from 'fs';
import { UserById } from './dto/userById.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaClient) {}

  async GetUserById(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (user) return user;

    throw new BadRequestException('Пользователь с данным Id не найден');
  }

  async GetUsers(page: number, countUsers: number) {
    await this.GetUsersValidation(page, countUsers);

    const skip = (page - 1) * countUsers;

    const [users, totalUsers] = await Promise.all([
      this.prisma.user.findMany({
        skip: skip,
        take: countUsers,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count(),
    ]);

    const totalPages = Math.ceil(totalUsers / countUsers);
    return {
      users,
      totalPages,
    };
  }

  async CreateNewUser(createUser: CreateUserDto, file: Express.Multer.File) {
    const uploadDir = path.join(process.cwd(), 'uploads', 'userAvatars');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    await this.prisma.$transaction(async (prisma) => {
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

      const fileName = newUser.id + '-avatar' + path.extname(file.originalname);
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

    return {
      status: true,
    };
  }

  async UpdateUser(updatedUser: UpdateUserDto, file?: Express.Multer.File) {
    await this.UpdateUserValidation(updatedUser);

    const { id, ...fieldsToUpdate } = updatedUser;

    await this.prisma.$transaction(async (prisma) => {
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

    return {
      status: true,
    };
  }

  async DeleteUser(deleteUser: DeleteUserDto) {
    await this.DeleteUserValidation(deleteUser);

    await this.prisma.user.delete({
      where: { id: deleteUser.id },
    });
    return {
      status: true,
    };
  }

  private async GetUsersValidation(page: number, countUsers: number) {
    if (!Number.isInteger(page) || page < 1) {
      throw new BadRequestException(
        'Номер страницы должен быть положительным целым числом (page >= 1)',
      );
    }

    if (!Number.isInteger(countUsers) || countUsers < 1 || countUsers > 100) {
      throw new BadRequestException(
        'Количество пользователей на странице должно быть от 1 до 100',
      );
    }
  }

  private async UpdateUserValidation(updateUser: UpdateUserDto) {
    try {
      await this.prisma.user.findUniqueOrThrow({
        where: {
          id: updateUser.id,
        },
      });
    } catch {
      throw new BadRequestException('Пользователя с данным ID не существует');
    }
  }

  private async DeleteUserValidation(deleteUser: DeleteUserDto) {
    try {
      await this.prisma.user.findUniqueOrThrow({
        where: {
          id: deleteUser.id,
        },
      });
    } catch {
      throw new BadRequestException('Пользователя с данным ID не существует');
    }
  }
}
