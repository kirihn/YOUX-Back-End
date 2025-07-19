import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteUserDto {
  @ApiProperty({ example: '' })
  @IsString()
  @IsNotEmpty()
  id: string;
}
