import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterInput } from '../auth/dto/auth-input.dto';
import { plainToClass } from 'class-transformer';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  // Get User By Email
  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  // Get User By Id
  async getUserById(id: string): Promise<UserEntity> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  // Create User
  async createUser(input: RegisterInput): Promise<UserEntity> {
    const user = plainToClass(UserEntity, input);
    user.email = input.email.toLowerCase();
    user.password = await bcrypt.hash(input.password, 12);
    user.firstName = input.firstName;
    user.lastName = input.lastName;
    return await this.usersRepository.save(user);
  }

  // Update User
  async updateUser(user: UserEntity): Promise<UserEntity> {
    return await this.usersRepository.save(user);
  }

  // Delete User
  async deleteUser(user: UserEntity): Promise<void> {
    await this.usersRepository.remove(user);
  }
}
