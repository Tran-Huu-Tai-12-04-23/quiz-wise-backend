import { Injectable } from '@nestjs/common';
import { enumData } from 'src/constants/enum-data';
import { PaginationDto } from 'src/dto/pagination.dto';
import { LibraryEntity } from 'src/entities/library.entity';
import { QuestionEntity } from 'src/entities/question.entity';
import { QuizEntity } from 'src/entities/quiz.entity';
import { UserEntity } from 'src/entities/user.entity';
import { LibraryRepository } from 'src/repositories/library.repository';
import { AddQuizToLibraryDTO, LibraryCreateDTO } from './dto/libraryCreate.dto';

@Injectable()
export class LibraryService {
  constructor(private readonly repo: LibraryRepository) {}

  async create(user: UserEntity, data: LibraryCreateDTO) {
    return this.repo.manager.transaction(async (manager) => {
      const repo = manager.getRepository(LibraryEntity);
      const library = new LibraryEntity();
      library.name = data.name;
      library.createdBy = user.id;
      library.createdAt = new Date();
      library.ownerId = user.id;
      await repo.insert(library);
      return {
        message: enumData.message.CREATE_SUCCESS,
      };
    });
  }

  async findAll(user: UserEntity, data: PaginationDto) {
    return await this.repo.findAndCount({
      where: {
        ownerId: user.id,
        isDeleted: false,
      },
      skip: data.skip,
      take: data.take,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async remove(id: string) {
    await this.repo.delete(id);

    return {
      message: enumData.message.DELETE_SUCCESS,
    };
  }

  async addQuiz(user: UserEntity, data: AddQuizToLibraryDTO) {
    return await this.repo.manager.transaction(async (manager) => {
      const repo = manager.getRepository(LibraryEntity);
      const quizRepo = manager.getRepository(QuizEntity);
      const questionRepo = manager.getRepository(QuestionEntity);
      const library = await repo.findOne({
        where: {
          id: data.libraryId,
        },
      });
      if (!library) {
        throw new Error('Library not found');
      }
      const quiz = new QuizEntity();
      quiz.name = data.name;
      quiz.description = data.description;
      quiz.thumbnails = '';
      quiz.libraryId = data.libraryId;
      quiz.createdAt = new Date();
      quiz.createdByName = user.username;
      quiz.createdBy = user.id;

      const quizSave = await quizRepo.save(quiz);

      for (const ques of data.questions) {
        const question = new QuestionEntity();
        question.title = ques.title;
        question.options = ques.options;
        question.correctAnswerIndex = ques.correctAnswerIndex;
        question.quiz = quizSave;
        await questionRepo.insert(question);
      }

      return { message: enumData.message.CREATE_SUCCESS };
    });
  }
}
