import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../common/abstracts/base.entity';
import { EntityName } from 'src/common/enums/entity-name.enum';

@Entity(EntityName.PRODUCT)
export class ProductEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
}
