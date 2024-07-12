import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ERROR_CODES, SUCCESS_CODES } from './constant';
import { LoginOutput, RegisterOutput } from './dto/auth-output.dto';
import { LoginInput, RegisterInput } from './dto/auth-input.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'User login API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: LoginOutput,
    description: SUCCESS_CODES.LOGGED_IN_SUCCESS,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: ERROR_CODES.INVALID_CREDENTIALS,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: `${ERROR_CODES.INVALID_CREDENTIALS}`,
  })
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  async login(
    @Req() ctx: any,
    @Res() res: Response,
    @Body() credential: LoginInput,
  ) {
    return await this.authService.login(res, ctx, credential);
  }

  @Post('register')
  @ApiOperation({
    summary: 'User registration API',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: RegisterOutput,
    description: SUCCESS_CODES.ACCOUNT_CREATED,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: ERROR_CODES.ACCOUNT_EXIST_ERROR,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: `${ERROR_CODES.USER_NOT_ADDED}`,
  })
  async registerLocal(
    @Req() ctx: any,
    @Body() input: RegisterInput,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return await this.authService.register(res, ctx, input);
  }
}
