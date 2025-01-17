import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
<<<<<<< HEAD:src/user-client/queries/dto/signIn-client.dto.ts
import { NoWhitespace } from '../../decorators/no-whitespace.decorator';
=======
import { NoWhitespace } from '../../../../modules/decorators/no-whitespace.decorator';
>>>>>>> b7d2924 (Revert "Creating Product and PRoductVariant entity, connect to Azure blob storage and make endpoints to create this products and save image in azure blob storage"):src/auth/signIn-client.dto.ts

export class signInClientDTO {
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
}
