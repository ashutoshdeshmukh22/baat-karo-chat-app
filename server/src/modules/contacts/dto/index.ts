import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { ContactEntity } from '../entities/contacts.entity';

export class ContactOutput {
  constructor(contact: ContactEntity) {
    this.id = contact.id;
    this.user = contact.user;
    this.contact = contact.contact;
  }
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  user: UserEntity;

  @Expose()
  @ApiProperty()
  contact: UserEntity;
}
