import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserOutput } from 'src/modules/user/dto/user.output.dto';
import { ChatEntity } from '../entities/chat.entity';

export class ChatOutput {
  constructor(chat: ChatEntity) {
    this.id = chat.id;
    this.message = chat.message;
    this.status = chat.status;
    this.sender = new UserOutput(chat.sender);
    this.receiver = new UserOutput(chat.receiver);
    this.timestamp = chat.timestamp;
  }

  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  message: string;

  @ApiProperty()
  @Expose()
  status: 'sent' | 'delivered' | 'read';

  @ApiProperty()
  @Expose()
  sender: UserOutput;

  @ApiProperty()
  @Expose()
  receiver: UserOutput;

  @ApiProperty()
  @Expose()
  timestamp: Date;
}
