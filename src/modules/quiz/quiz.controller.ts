import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from 'src/entities/user.entity';
import { CurrentUser } from 'src/helpers/decorators';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { QuizCreateDTO } from './dto/quizCreate.dto';
import { QuizService } from './quiz.service';

@ApiTags('quiz')
@UseGuards(JwtAuthGuard)
@Controller('quiz')
export class QuizController {
  constructor(private readonly service: QuizService) {}

  @ApiOperation({
    summary: 'Save quiz test by user create',
  })
  @ApiResponse({ status: 201 })
  @Post()
  async create(@CurrentUser() user: UserEntity, @Body() body: QuizCreateDTO) {
    return await this.service.create(user, body);
  }

  @ApiOperation({
    summary: 'Get quiz data',
  })
  @ApiResponse({ status: 201 })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.service.findOne(id);
  }
}
