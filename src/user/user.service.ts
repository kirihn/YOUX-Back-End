import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  GetUsers(page: number, countUsers: number) {
    return `This action returns all user`;
  }
  
  CreateNewUser(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }


  UpdateUser(UpdateUserDto: UpdateUserDto) {
    return `This action returns a # user`;
  }

  DeleteUser(deleteUserDto: DeleteUserDto) {
    return `This action removes a # user`;
  }
}
