import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(dto: CreateOrderDto): Promise<import("./entities/order.entity").OrderEntity>;
    findAll(paginationDto: PaginationDto): Promise<{
        orders: import("./entities/order.entity").OrderEntity[];
        pagination: {
            totalItems: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<import("./entities/order.entity").OrderEntity>;
    updateStatus(id: number, dto: UpdateOrderStatusDto): Promise<import("./entities/order.entity").OrderEntity>;
    remove(id: number): Promise<void>;
}
