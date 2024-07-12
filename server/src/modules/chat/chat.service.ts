import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { ChatEntity } from './entities/chat.entity';
import { ChatOutput } from './dto/chat.output.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity)
    private readonly chatRepository: Repository<ChatEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async sendMessage(
    senderId: string,
    receiverId: string,
    message: string,
  ): Promise<ChatEntity> {
    const sender = await this.userRepository.findOne({
      where: { id: senderId },
    });
    const receiver = await this.userRepository.findOne({
      where: { id: receiverId },
    });

    if (!sender || !receiver) {
      throw new NotFoundException('Sender or receiver not found');
    }

    const newMessage = this.chatRepository.create({
      message,
      sender,
      receiver,
    });

    return this.chatRepository.save(newMessage);
  }

  async getChatHistory(
    userId: string,
    contactId: string,
  ): Promise<ChatOutput[]> {
    const chats = await this.chatRepository.find({
      where: [
        { sender: { id: userId }, receiver: { id: contactId } },
        { sender: { id: contactId }, receiver: { id: userId } },
      ],
      order: { timestamp: 'ASC' },
      relations: ['sender', 'receiver'],
    });

    return chats.map((chat) => new ChatOutput(chat));
  }

  async deleteMessage(userId: string, messageId: string): Promise<void> {
    const message = await this.chatRepository.findOne({
      where: { id: messageId, sender: { id: userId } },
    });

    if (!message) {
      throw new NotFoundException('Message not found or not sent by user');
    }

    await this.chatRepository.remove(message);
  }
}
