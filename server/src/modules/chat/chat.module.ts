import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity } from './entities/chat.entity';
import { UserEntity } from '../user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/core/environment';
import { ChatGateway } from 'src/gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatEntity, UserEntity]),
    JwtModule.register({ secret: JWT_SECRET }),
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
