import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { DeleteUserDto } from './dto/deleteUser.dto';

@Injectable()
export class UserService {
  async GetUsers(page: number, countUsers: number) {
    return `This action returns all user`;
  }

  async CreateNewUser(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async UpdateUser(UpdateUserDto: UpdateUserDto) {
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
