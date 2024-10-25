import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LibraryCreateDTO {
  @ApiProperty({ description: 'Name of lib' })
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class AddQuizToLibraryDTO {
  @ApiProperty({ description: 'Library id' })
  @IsNotEmpty()
  @IsString()
  libraryId: string;

  @ApiProperty({ description: 'Name of quiz' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Description of quiz' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Description of quiz' })
  @IsArray()
  @Type(() => QuestionDTO)
  questions: QuestionDTO[];
}

export class QuestionDTO {
  @ApiProperty({ description: 'title of question' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'options of question' })
  @IsNotEmpty()
  @IsString()
  options: string;

  @ApiProperty({ description: 'Correct Answer Index of question' })
  @IsNotEmpty()
  @IsNumber()
  correctAnswerIndex: number;
}
