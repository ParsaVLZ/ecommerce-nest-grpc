import { BaseEntity } from '../../../common/abstracts/base.entity';
import { OrderStatus } from '../../../common/enums/order-status.enum';
export declare class OrderEntity extends BaseEntity {
    userId: number;
    productIds: number[];
    totalAmount: number;
    status: OrderStatus;
}
