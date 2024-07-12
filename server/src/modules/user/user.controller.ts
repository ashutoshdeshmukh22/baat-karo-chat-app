import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully retrieved.',
    type: UserEntity,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiBearerAuth('access-token')
  async getUser(@Req() req): Promise<UserEntity> {
    const userId = req.user.id;
    return await this.usersService.getUserById(userId);
  }
}
