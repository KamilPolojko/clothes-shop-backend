import { Gender } from '../../types/gender';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';
import { NoWhitespace } from '../../decorators/no-whitespace.decorator';

export class createClientDTO {
  @ApiProperty({
    default: '',
  })
  @IsNotEmpty()
  @IsString()
  @NoWhitespace()
  @MaxLength(20)
  firstName: string;

  @ApiProperty({
    default: '',
  })
  @IsNotEmpty()
  @IsString()
  @NoWhitespace()
  @MaxLength(20)
  lastName: string;

  @ApiProperty({
    default: '',
  })
  @IsNotEmpty()
  @IsString()
  @NoWhitespace()
  @IsEmail()
  email: string;

  @ApiProperty({
    default: '',
  })
  @IsNotEmpty()
  @IsString()
  @NoWhitespace()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 2,
    minSymbols: 1,
  })
  password: string;

  @ApiProperty({
    enum: Gender,
    description: 'Select gender from available options',
  })
  @IsEnum(Gender, {
    message: 'gender must be one of the following values: MALE, FEMALE, OTHER',
  })
  gender: Gender;

  @ApiProperty({
    type: String,
    format: 'date-time',
    description:
      'Date of birth of the client. Use ISO 8601 format: YYYY-MM-DDTHH:mm:ssZ',
    example: '1990-01-01T00:00:00Z',
  })
  @IsNotEmpty()
  @IsISO8601()
  @NoWhitespace()
  dateOfBirth: string;
}
