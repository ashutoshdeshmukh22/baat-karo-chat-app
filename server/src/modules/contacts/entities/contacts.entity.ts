import { BaseEntity } from 'src/core/config/typeorm/base.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('contacts')
export class ContactEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.contacts)
  user: UserEntity;

  @ManyToOne(() => UserEntity)
  contact: UserEntity;
}
