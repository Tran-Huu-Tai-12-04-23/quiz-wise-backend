import { UserAnswerHistoryEntity } from 'src/entities/userAnswerHistory.entity';
import { CustomRepository } from 'src/typeorm/typeorm-decorater';
import { Repository } from 'typeorm';

@CustomRepository(UserAnswerHistoryEntity)
export class UserAnswerHistoryRepository extends Repository<UserAnswerHistoryEntity> {}
