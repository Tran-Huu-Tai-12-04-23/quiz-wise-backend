import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNewQuizDTO {
  @ApiProperty({ description: 'Level of quiz' })
  @IsNotEmpty()
  @IsString()
  level: string;
  @ApiProperty({ description: 'Type of quiz' })
  @IsNotEmpty()
  @IsString()
  type: string;
}
