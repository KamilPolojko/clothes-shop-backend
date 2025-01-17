import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class createProductDTO {
  @ApiProperty({
    default: '',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  @Max(999999.99)
  price: number;

  @ApiProperty({
    default: '',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
