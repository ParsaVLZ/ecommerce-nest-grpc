import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UserService);
    create(dto: CreateUserDto): Promise<import("./entities/user.entity").UserEntity>;
    findAll(query: PaginationDto): Promise<{
        users: import("./entities/user.entity").UserEntity[];
        pagination: {
            totalItems: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getOne(id: number): Promise<import("./entities/user.entity").UserEntity>;
    update(id: number, dto: UpdateUserDto): Promise<import("./entities/user.entity").UserEntity>;
    remove(id: number): Promise<void>;
}
