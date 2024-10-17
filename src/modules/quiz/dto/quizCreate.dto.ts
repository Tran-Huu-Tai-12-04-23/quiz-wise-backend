import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class QuizCreateDTO {
  @ApiProperty({ description: 'Library id' })
  @IsNotEmpty()
  @IsString()
  libraryId: string;
  @ApiProperty({ description: 'Name of quiz' })
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty({ description: 'Description of quiz' })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Thumbnails of quiz' })
  @IsOptional()
  @IsString()
  thumbnails: string;

  @ApiProperty({ description: 'Questions of quiz' })
  @Type(() => QuestionCreateDTO)
  @IsArray()
  questions: QuestionCreateDTO[];
}

export class QuestionCreateDTO {
  @ApiProperty({ description: 'title of quiz' })
  @IsNotEmpty()
  @IsString()
  title: string;
  @ApiProperty({ description: 'Options of question' })
  @IsNotEmpty()
  @IsArray()
  options: string[];
  @ApiProperty({ description: 'Correct answer index' })
  @IsNotEmpty()
  @IsString()
  correctAnswerIndex: string;
}
