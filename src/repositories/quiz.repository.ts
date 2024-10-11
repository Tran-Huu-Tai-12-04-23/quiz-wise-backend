import { QuizEntity } from 'src/entities/quiz.entity';
import { CustomRepository } from 'src/typeorm/typeorm-decorater';
import { Repository } from 'typeorm';

@CustomRepository(QuizEntity)
export class QuizRepository extends Repository<QuizEntity> {}
