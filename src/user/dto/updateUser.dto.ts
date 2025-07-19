import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Gender } from './createUser.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: '' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'Кирюша' })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ example: 'Зыккооов' })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({ example: 183 })
  @IsNumber()
  @IsOptional()
  height?: number;

  @ApiProperty({ example: 80 })
  @IsNumber()
  @IsOptional()
  weight?: number;

  @ApiProperty({ example: 'ж' })
  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;

  @ApiProperty({ example: 'Прилессье' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
  })
  photo: any;
}
