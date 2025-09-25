import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { OrderEntity } from './entities/order.entity';
import { OrderStatus } from 'src/common/enums/order-status.enum';

const numToStatus: Record<number, OrderStatus> = {
  0: OrderStatus.CREATED,
  1: OrderStatus.PAID,
  2: OrderStatus.SHIPPED,
};

const statusToNum: Record<OrderStatus, number> = {
  [OrderStatus.CREATED]: 0,
  [OrderStatus.PAID]: 1,
  [OrderStatus.SHIPPED]: 2,
};

function toProtoOrder(o: OrderEntity) {
  return {
    id: o.id,
    user_id: o.userId,
    product_ids: o.productIds,
    total_amount: o.totalAmount.toFixed(2),
    status: statusToNum[o.status],
    created_at: o.created_at.toISOString(),
    updated_at: o.updated_at.toISOString()
  };
}

@Controller()
export class OrdersGrpcController {
  constructor(private readonly orders: OrdersService) {}

  @GrpcMethod('OrdersService', 'Create')
  async create(data: { user_id: number; product_ids: number[] }) {
    const created = await this.orders.create({
      userId: data.user_id,
      productIds: data.product_ids,
    });
    return toProtoOrder(created);
  }

  @GrpcMethod('OrdersService', 'FindAll')
  async findAll({ page = 1, limit = 10 }: { page?: number; limit?: number }) {
    const { orders, pagination } = await this.orders.findAll({ page, limit });
    return {
      orders: orders.map(toProtoOrder),
      total: pagination.totalItems,
      page: pagination.page,
      limit: pagination.limit,
      pages: pagination.totalPages,
    };
  }

  @GrpcMethod('OrdersService', 'FindOne')
  async findOne({ id }: { id: number }) {
    const o = await this.orders.findOne(id);
    return toProtoOrder(o);
  }

  @GrpcMethod('OrdersService', 'UpdateStatus')
  async updateStatus({ id, status }: { id: number; status: number }) {
    const mapped = numToStatus[status];
    const updated = await this.orders.updateStatus(id, { status: mapped });
    return toProtoOrder(updated);
  }

  @GrpcMethod('OrdersService', 'Remove')
  async remove({ id }: { id: number }) {
    await this.orders.remove(id);
    return { success: true };
  }
}
