import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { ContactEntity } from './entities/contacts.entity';
import { ContactOutput } from './dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(ContactEntity)
    private readonly contactRepository: Repository<ContactEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async addContact(
    userId: string,
    contactEmail: string,
  ): Promise<ContactOutput> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const contact = await this.userRepository.findOne({
      where: { email: contactEmail },
    });

    if (!user || !contact) {
      throw new NotFoundException('User or contact not found');
    }

    const existingContact = await this.contactRepository.findOne({
      where: { user: { id: userId }, contact: { id: contact.id } },
    });

    if (existingContact) {
      throw new BadRequestException('Contact already exists');
    }

    const newContact = this.contactRepository.create({
      user,
      contact,
    });

    const savedContact = await this.contactRepository.save(newContact);
    return new ContactOutput(savedContact);
  }

  //   async getContacts(
  //     userId: string,
  //     searchTerm: string,
  //   ): Promise<ContactEntity[]> {
  //     return this.contactRepository
  //       .createQueryBuilder('contact')
  //       .leftJoinAndSelect('contact.contact', 'contactUser')
  //       .where('contact.user.id = :userId', { userId })
  //       .andWhere(
  //         'contactUser.email LIKE :searchTerm OR contactUser.firstName LIKE :searchTerm OR contactUser.lastName LIKE :searchTerm',
  //         { searchTerm: `%${searchTerm}%` },
  //       )
  //       .getMany();
  //   }

  async getContacts(
    userId: string,
    searchTerm: string,
  ): Promise<ContactOutput[]> {
    const contacts = await this.contactRepository.find({
      where: { user: { id: userId } },
      relations: ['contact'],
    });

    if (!searchTerm) {
      return contacts;
    }

    const filteredContacts = contacts.filter((contact) => {
      const { email, firstName, lastName } = contact.contact;
      return (
        email?.includes(searchTerm) ||
        firstName?.includes(searchTerm) ||
        lastName?.includes(searchTerm)
      );
    });

    return filteredContacts.map((contact) => new ContactOutput(contact));
  }

  async deleteContact(userId: string, contactId: string): Promise<void> {
    const contact = await this.contactRepository.findOne({
      where: { user: { id: userId }, contact: { id: contactId } },
    });

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    await this.contactRepository.remove(contact);
  }
}
