import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../common/abstracts/base.entity';
import { EntityName } from '../../../common/enums/entity-name.enum';
import { OrderStatus } from '../../../common/enums/order-status.enum';

@Entity(EntityName.ORDER)
export class OrderEntity extends BaseEntity {
  @Column({ name: 'user_id', type: 'int' })
  userId: number;

  @Column({ name: 'product_ids', type: 'json' })
  productIds: number[];

  @Column({ name: 'total_amount', type: 'decimal', precision: 12, scale: 2 })
  totalAmount: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.CREATED })
  status: OrderStatus;
}
