import { Module } from '@nestjs/common';
import { QuizRepository } from 'src/repositories/question.repository';
import { TypeOrmExModule } from 'src/typeorm';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([QuizRepository])],
  providers: [QuizService],
  controllers: [QuizController],
  exports: [QuizService],
})
export class QuizModule {}
