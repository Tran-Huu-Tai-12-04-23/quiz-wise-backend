import { Injectable, NotFoundException } from '@nestjs/common';
import { enumData } from 'src/constants/enum-data';
import { QuestionEntity } from 'src/entities/question.entity';
import { QuizEntity } from 'src/entities/quiz.entity';
import { UserEntity } from 'src/entities/user.entity';
import { QuizRepository } from 'src/repositories/question.repository';
import { QuizCreateDTO } from './dto/quizCreate.dto';

@Injectable()
export class QuizService {
  constructor(private readonly repo: QuizRepository) {}

  async create(user: UserEntity, body: QuizCreateDTO) {
    return this.repo.manager.transaction(async (manager) => {
      const repo = manager.getRepository(QuizEntity);
      const questionRepo = manager.getRepository(QuestionEntity);
      const quiz = new QuizEntity();
      quiz.createdBy = user.id;
      quiz.createdAt = new Date();
      quiz.name = body.name;
      quiz.description = body.description;
      quiz.thumbnails = body.thumbnails;
      quiz.libraryId = body.libraryId;
      const quizSave = await repo.save(quiz);
      const lstQuestionEntity = body.questions.map((q) => {
        const question = new QuestionEntity();
        question.title = q.title;
        question.options = q.options.join(',');
        question.correctAnswerIndex = q.correctAnswerIndex;
        question.quiz = quizSave;
        return question;
      });
      await questionRepo.insert(lstQuestionEntity);

      return {
        message: enumData.message.CREATE_SUCCESS,
      };
    });
  }

  async findOne(id: string) {
    const res: any = await this.repo.findOne({
      where: {
        id,
        isDeleted: false,
      },
      relations: {
        questions: true,
        library: true,
      },
    });

    if (!res) {
      throw new NotFoundException(enumData.error.NOT_FOUND);
    }
    res.questions = res.__questions__;
    res.library = res.__library__;

    delete res.__questions__;
    delete res.__library__;

    return res;
  }
}
