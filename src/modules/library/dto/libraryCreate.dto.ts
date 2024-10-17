import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LibraryCreateDTO {
  @ApiProperty({ description: 'Name of lib' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
