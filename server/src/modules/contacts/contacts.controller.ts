import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Query,
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
  ApiQuery,
} from '@nestjs/swagger';
import { ContactsService } from './contacts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ContactOutput } from './dto';

@ApiTags('Contacts')
@Controller('contacts')
@UseGuards(JwtAuthGuard)
export class ContactsController {
  constructor(private readonly contactService: ContactsService) {}

  @Post()
  @ApiOperation({
    summary: 'Add a contact',
  })
  @ApiBody({
    description: 'Add contact payload',
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ContactOutput,
    description: 'Contact added successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User or contact not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Contact already exists',
  })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async addContact(@Req() req, @Body('email') contactEmail: string) {
    const userId = req.user.id;
    console.log(contactEmail);

    return this.contactService.addContact(userId, contactEmail);
  }

  @Get()
  @ApiOperation({
    summary: 'Get contacts',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Search term to filter contacts by name or email',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [ContactOutput],
    description: 'Contacts retrieved successfully',
  })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getContacts(@Req() req, @Query('search') searchTerm: string) {
    const userId = req.user.id;
    return this.contactService.getContacts(userId, searchTerm);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a contact',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the contact to delete',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Contact deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Contact not found',
  })
  async deleteContact(@Req() req, @Param('id') contactId: string) {
    const userId = req.user.id;
    await this.contactService.deleteContact(userId, contactId);
    return { message: 'Contact deleted successfully' };
  }
}
