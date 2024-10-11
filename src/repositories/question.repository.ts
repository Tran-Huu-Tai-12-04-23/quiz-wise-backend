import { QuestionEntity } from 'src/entities/question.entity';
import { CustomRepository } from 'src/typeorm/typeorm-decorater';
import { Repository } from 'typeorm';

@CustomRepository(QuestionEntity)
export class QuizRepository extends Repository<QuestionEntity> {}
