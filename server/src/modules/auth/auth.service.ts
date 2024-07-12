import { HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { LoginInput, RegisterInput } from './dto/auth-input.dto';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';
import { ERROR_CODES, SUCCESS_CODES } from './constant';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/core/environment';
import { RegisterOutput } from './dto/auth-output.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(res: Response, ctx: any, credential: LoginInput): Promise<any> {
    const user: UserEntity = await this.userService.getUserByEmail(
      credential.email.toLowerCase(),
    );

    if (!user) {
      res.status(HttpStatus.NOT_FOUND).json({
        message: ERROR_CODES.USER_NOT_FOUND,
      });
      return;
    }

    const isPwMatch: boolean = await bcrypt.compare(
      credential.password,
      user.password,
    );

    if (!isPwMatch) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        message: ERROR_CODES.INVALID_CREDENTIALS,
      });
      return;
    }

    const authToken = this.getAuthToken(user);
    res.status(HttpStatus.OK).json({
      message: SUCCESS_CODES.LOGGED_IN_SUCCESS,
      token: authToken,
    });
  }

  async register(res: Response, ctx: any, input: RegisterInput): Promise<any> {
    const user: UserEntity = await this.userService.getUserByEmail(
      input.email.toLowerCase(),
    );

    if (user) {
      res.status(HttpStatus.CONFLICT).json({
        message: ERROR_CODES.ACCOUNT_EXIST_ERROR,
      });
      return;
    }

    const registeredUser = await this.userService.createUser(input);
    if (!registeredUser) {
      res.status(HttpStatus.FORBIDDEN).json({
        message: ERROR_CODES.USER_NOT_ADDED,
      });
      return;
    }

    res.status(HttpStatus.OK).json({
      message: SUCCESS_CODES.USER_REGISTERED,
      user: new RegisterOutput(registeredUser),
    });
  }

  getAuthToken(user: UserEntity) {
    const subject = { sub: user.id };
    const payload = { userId: user.id, email: user.email };
    const authToken = {
      access_token: this.jwtService.sign(
        { ...payload, ...subject },
        {
          expiresIn: '1d',
          secret: JWT_SECRET,
        },
      ),
      refresh_token: this.jwtService.sign(
        { ...subject },
        {
          expiresIn: '7d',
          secret: JWT_SECRET,
        },
      ),
    };

    return authToken;
  }
}
