import { Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactEntity } from './entities/contacts.entity';
import { UserEntity } from '../user/entities/user.entity';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([ContactEntity, UserEntity])],
  controllers: [ContactsController],
  providers: [ContactsService],
})
export class ContactsModule {}
