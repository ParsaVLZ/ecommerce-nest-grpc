import { Repository } from 'typeorm';
import { OrderEntity } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { UserEntity } from '../users/entities/user.entity';
import { ProductEntity } from '../products/entities/product.entity';
export declare class OrdersService {
    private readonly orderRepo;
    private readonly userRepo;
    private readonly productRepo;
    constructor(orderRepo: Repository<OrderEntity>, userRepo: Repository<UserEntity>, productRepo: Repository<ProductEntity>);
    create(dto: CreateOrderDto): Promise<OrderEntity>;
    findAll(paginationDto: PaginationDto): Promise<{
        orders: OrderEntity[];
        pagination: {
            totalItems: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<OrderEntity>;
    updateStatus(id: number, dto: UpdateOrderStatusDto): Promise<OrderEntity>;
    remove(id: number): Promise<void>;
    private ensureNonEmptyProducts;
    private ensureUserExists;
    private fetchProducts;
    private buildQuantityMap;
    private toCents;
    private fromCents;
    private sumTotalCents;
}
