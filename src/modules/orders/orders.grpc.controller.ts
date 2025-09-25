import { BadRequestException, Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { OrderEntity } from './entities/order.entity';
import { OrderStatus } from 'src/common/enums/order-status.enum';
import { toRpcException } from 'src/common/exceptions/grpc-exception.util';

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
  const n = typeof o.totalAmount === 'number' ? o.totalAmount : Number(o.totalAmount);
  const total_amount = Number.isFinite(n) ? n.toFixed(2) : '0.00';
  const statusEnum = o.status ?? OrderStatus.CREATED;
  const statusNum = statusToNum[statusEnum] ?? statusToNum[OrderStatus.CREATED];

  return {
    id: o.id,
    user_id: o.userId,
    product_ids: o.productIds,
    total_amount,
    status: statusNum,
    created_at: o.created_at.toISOString(),
    updated_at: o.updated_at.toISOString(),
  };
}

function getCreatePayload(data: any) {
  const userId = data.user_id ?? data.userId;
  const productIds = data.product_ids ?? data.productIds;
  return { userId, productIds };
}

@Controller()
export class OrdersGrpcController {
  constructor(private readonly orders: OrdersService) {}

  @GrpcMethod('OrdersService', 'Create')
  async create(data: { user_id?: number; userId?: number; product_ids?: number[]; productIds?: number[] }) {
    try {
      const { userId, productIds } = getCreatePayload(data);

      if (!Array.isArray(productIds) || productIds.length === 0) {
        throw new BadRequestException('product_ids must be a non-empty array');
      }
      if (typeof userId !== 'number') {
        throw new BadRequestException('user_id must be a number');
      }

      const created = await this.orders.create({ userId, productIds });
      return toProtoOrder(created);
    } catch (e) {
      throw toRpcException(e);
    }
  }

  @GrpcMethod('OrdersService', 'FindAll')
  async findAll({ page = 1, limit = 10 }: { page?: number; limit?: number }) {
    try {
      const { orders, pagination } = await this.orders.findAll({ page, limit });
      return {
        orders: orders.map(toProtoOrder),
        total: pagination.totalItems,
        page: pagination.page,
        limit: pagination.limit,
        pages: pagination.totalPages,
      };
    } catch (e) {
      throw toRpcException(e);
    }
  }

  @GrpcMethod('OrdersService', 'FindOne')
  async findOne({ id }: { id: number }) {
    try {
      const o = await this.orders.findOne(id);
      return toProtoOrder(o);
    } catch (e) {
      throw toRpcException(e);
    }
  }

  @GrpcMethod('OrdersService', 'UpdateStatus')
  async updateStatus({ id, status }: { id: number; status: number }) {
    try {
      const mapped = numToStatus[status];
      if (mapped === undefined) {
        throw new BadRequestException('Invalid order status');
      }
      const updated = await this.orders.updateStatus(id, { status: mapped });
      return toProtoOrder(updated);
    } catch (e) {
      throw toRpcException(e);
    }
  }

  @GrpcMethod('OrdersService', 'Remove')
  async remove({ id }: { id: number }) {
    try {
      await this.orders.remove(id);
      return { success: true };
    } catch (e) {
      throw toRpcException(e);
    }
  }
}
