import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from '../../../common/abstracts/base.entity';
import { EntityName } from 'src/common/enums/entity-name.enum';

@Entity(EntityName.USER)
export class UserEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;
}
