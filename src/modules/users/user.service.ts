import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { paginationGenerator, paginationSolver } from 'src/common/utils/pagination.util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async createUser(dto: CreateUserDto) {
    const exists = await this.userRepo.findOne({ where: { email: dto.email } });
    if (exists) throw new ConflictException('Email already in use!');

    const user = this.userRepo.create(dto);
    return this.userRepo.save(user);
  }

  async getAllUsers(paginationDto: PaginationDto) {
    const { skip, limit, page } = paginationSolver(paginationDto);

    const [users, total] = await this.userRepo.findAndCount({
      skip,
      take: limit,
      order: { id: 'DESC' },
    });

    return {
      users,
      pagination: paginationGenerator(total, page, limit),
    };
  }

  async getUserById(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found!');
    return user;
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found!');

    Object.assign(user, dto);
    return this.userRepo.save(user);
  }

  async removeUser(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found!');
    await this.userRepo.delete(id);
  }
}
