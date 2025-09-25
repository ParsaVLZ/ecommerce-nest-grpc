import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { toRpcException } from 'src/common/exceptions/grpc-exception.util';

@Controller()
export class UsersGrpcController {
  constructor(private readonly users: UserService) {}

  @GrpcMethod('UsersService', 'Create')
  async create(data: CreateUserDto) {
    try {
      return await this.users.createUser(data);
    } catch (e) {
      throw toRpcException(e);
    }
  }

  @GrpcMethod('UsersService', 'FindAll')
  async findAll({ page = 1, limit = 10 }: { page?: number; limit?: number }) {
    try {
      return await this.users.getAllUsers({ page, limit });
    } catch (e) {
      throw toRpcException(e);
    }
  }

  @GrpcMethod('UsersService', 'FindOne')
  async findOne({ id }: { id: number }) {
    try {
      return await this.users.getUserById(id);
    } catch (e) {
      throw toRpcException(e);
    }
  }

  @GrpcMethod('UsersService', 'Update')
  async update({ id, ...dto }: { id: number } & UpdateUserDto) {
    try {
      return await this.users.updateUser(id, dto);
    } catch (e) {
      throw toRpcException(e);
    }
  }

  @GrpcMethod('UsersService', 'Remove')
  async remove({ id }: { id: number }) {
    try {
      await this.users.removeUser(id);
      return { success: true };
    } catch (e) {
      throw toRpcException(e);
    }
  }
}
