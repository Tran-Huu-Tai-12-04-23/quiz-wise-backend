import { Module } from '@nestjs/common';
import { LibraryRepository } from 'src/repositories/library.repository';
import { QuizRepository } from 'src/repositories/quiz.repository';
import { TypeOrmExModule } from 'src/typeorm';
import { LibraryController } from './library.controller';
import { LibraryService } from './library.service';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([LibraryRepository, QuizRepository]),
  ],
  providers: [LibraryService],
  controllers: [LibraryController],
  exports: [LibraryService],
})
export class LibraryModule {}
