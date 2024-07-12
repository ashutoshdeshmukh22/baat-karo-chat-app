import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/core/config/typeorm/base.entity';
import { ChatEntity } from 'src/modules/chat/entities/chat.entity';
import { ContactEntity } from 'src/modules/contacts/entities/contacts.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  Column,
  OneToMany,
} from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Unique('email', ['email'])
  @Column({ length: 200 })
  email: string;

  @ApiProperty()
  @Column({ nullable: true })
  @Exclude()
  password: string;

  @ApiProperty()
  @Column({ nullable: true, name: 'first_name' })
  firstName: string;

  @ApiProperty()
  @Column({ nullable: true, name: 'last_name' })
  lastName: string;

  @OneToMany(() => ChatEntity, (chat) => chat.sender)
  sentMessages: ChatEntity[];

  @OneToMany(() => ChatEntity, (chat) => chat.receiver)
  receivedMessages: ChatEntity[];

  @OneToMany(() => ContactEntity, (contact) => contact.user)
  contacts: ContactEntity[];
}
