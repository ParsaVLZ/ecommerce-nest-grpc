import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
export declare class UserService {
    private readonly userRepo;
    constructor(userRepo: Repository<UserEntity>);
    createUser(dto: CreateUserDto): Promise<UserEntity>;
    getAllUsers(paginationDto: PaginationDto): Promise<{
        users: UserEntity[];
        pagination: {
            totalItems: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getUserById(id: number): Promise<UserEntity>;
    updateUser(id: number, dto: UpdateUserDto): Promise<UserEntity>;
    removeUser(id: number): Promise<void>;
}
