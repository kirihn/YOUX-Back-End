import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Gender } from './createUser.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateUserDto {
  @ApiProperty({ example: '' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'Кирюша', required: false })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ example: 'Зыккооов', required: false })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  lastName?: string;

  @ApiProperty({ example: 183, required: false })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  height?: number;

  @ApiProperty({ example: 80, required: false })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  weight?: number;

  @ApiProperty({ example: 'ж', required: false })
  @IsEnum(Gender)
  @IsNotEmpty()
  @IsOptional()
  gender?: Gender;

  @ApiProperty({ example: 'Прилессье', required: false })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  address?: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
  })
  photo: any;
}
