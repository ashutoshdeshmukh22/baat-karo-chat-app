import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpStatus,
  HttpCode,
  Req,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ChatEntity } from './entities/chat.entity';

@ApiTags('Chats')
@Controller('chats')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @ApiOperation({
    summary: 'Send a message',
  })
  @ApiBody({
    description: 'Send message payload',
    schema: {
      type: 'object',
      properties: {
        receiverId: { type: 'string' },
        message: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ChatEntity,
    description: 'Message sent successfully',
  })
  @HttpCode(HttpStatus.CREATED)
  async sendMessage(
    @Req() req,
    @Body() body: { receiverId: string; message: string },
  ) {
    const senderId = req.user.id;
    const { receiverId, message } = body;
    return this.chatService.sendMessage(senderId, receiverId, message);
  }

  @Get(':contactId')
  @ApiOperation({
    summary: 'Get chat history',
  })
  @ApiParam({
    name: 'contactId',
    description: 'ID of the contact to retrieve chat history with',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [ChatEntity],
    description: 'Chat history retrieved successfully',
  })
  async getChatHistory(@Req() req, @Param('contactId') contactId: string) {
    const userId = req.user.id;
    return this.chatService.getChatHistory(userId, contactId);
  }

  @Delete(':messageId')
  @ApiOperation({
    summary: 'Delete a message',
  })
  @ApiParam({
    name: 'messageId',
    description: 'ID of the message to delete',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Message deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Message not found or not sent by user',
  })
  async deleteMessage(@Req() req, @Param('messageId') messageId: string) {
    const userId = req.user.id;
    await this.chatService.deleteMessage(userId, messageId);
    return { message: 'Message deleted successfully' };
  }
}
