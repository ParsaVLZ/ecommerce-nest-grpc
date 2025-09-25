import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UsersGrpcController {
  constructor(private readonly users: UserService) {}

  @GrpcMethod('UsersService', 'Create')
  create(data: CreateUserDto) {
    return this.users.createUser(data);
  }

  @GrpcMethod('UsersService', 'FindAll')
  findAll({ page = 1, limit = 10 }: { page?: number; limit?: number }) {
    return this.users.getAllUsers({ page, limit });
  }

  @GrpcMethod('UsersService', 'FindOne')
  findOne({ id }: { id: number }) {
    return this.users.getUserById(id);
  }

  @GrpcMethod('UsersService', 'Update')
  update({ id, ...dto }: { id: number } & UpdateUserDto) {
    return this.users.updateUser(id, dto);
  }

  @GrpcMethod('UsersService', 'Remove')
  remove({ id }: { id: number }) {
    return this.users.removeUser(id);
  }
}
