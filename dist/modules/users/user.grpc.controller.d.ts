import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersGrpcController {
    private readonly users;
    constructor(users: UserService);
    create(data: CreateUserDto): Promise<import("./entities/user.entity").UserEntity>;
    findAll({ page, limit }: {
        page?: number;
        limit?: number;
    }): Promise<{
        users: import("./entities/user.entity").UserEntity[];
        pagination: {
            totalItems: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne({ id }: {
        id: number;
    }): Promise<import("./entities/user.entity").UserEntity>;
    update({ id, ...dto }: {
        id: number;
    } & UpdateUserDto): Promise<import("./entities/user.entity").UserEntity>;
    remove({ id }: {
        id: number;
    }): Promise<void>;
}
