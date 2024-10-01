import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GeminiAIService } from './geminiAI.service';
import { CreateNewQuizDTO } from './dto';

@ApiTags('GeminiAI')
@Controller('ai')
export class GeminiAIController {
  constructor(private readonly service: GeminiAIService) {}

  @ApiOperation({
    summary: 'Gemini AI test',
  })
  @ApiResponse({ status: 201 })
  @Get('test')
  async test() {
    return await this.service.test();
  }

  @ApiOperation({
    summary: 'Ten quiz with level',
  })
  @ApiResponse({ status: 201 })
  @Post('create-quiz')
  async getTenQuizLowLevel(
    @Body()
    data: CreateNewQuizDTO,
  ) {
    return await this.service.createQuiz(data);
  }
}
