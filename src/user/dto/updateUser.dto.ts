import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Gender } from './createUser.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateUserDto {
  @ApiProperty({ example: 'Кирюша', required: false })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ example: 'Зыккооов', required: false })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({ example: 183, required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  height?: number;

  @ApiProperty({ example: 80, required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  weight?: number;

  @ApiProperty({ example: 'ж', required: false })
  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;

  @ApiProperty({ example: 'Прилессье', required: false })
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
