import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export enum Gender {
  Male = 'м',
  Female = 'ж',
}

export class CreateUserDto {
  @ApiProperty({ example: 'Кирилл' })
  @IsString()
  @IsNotEmpty({ message: 'Имя не должно быть пустым' })
  firstName: string;

  @ApiProperty({ example: 'Зыков' })
  @IsString()
  @IsNotEmpty({ message: 'Фамилия не должна быть пустой' })
  lastName: string;

  @ApiProperty({ example: 174 })
  @Type(() => Number)
  @IsNumber()
  height: number;

  @ApiProperty({ example: 73 })
  @Type(() => Number)
  @IsNumber()
  weight: number;

  @ApiProperty({ example: 'м' })
  @IsEnum(Gender, { message: 'Гендер должен быть пустым м|ж' })
  gender: Gender;

  @ApiProperty({ example: 'Минск' })
  @IsString()
  @IsNotEmpty({ message: 'Адрес не должен быть пустым' })
  address: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: true,
  })
  photo: any;
}
