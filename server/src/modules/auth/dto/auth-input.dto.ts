import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsEmail,
  MaxLength,
  Length,
  IsString,
  IsOptional,
} from 'class-validator';

export class RegisterInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(6, 100)
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(100)
  @IsString()
  @Transform(({ value }) => value.trim())
  @IsOptional()
  firstName: string;

  @ApiProperty()
  @MaxLength(200)
  @IsString()
  @IsOptional()
  lastName: string;
}

export class LoginInput {
  @IsNotEmpty()
  @ApiProperty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  password: string;
}
