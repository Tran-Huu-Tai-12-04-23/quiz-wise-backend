import { Column, Entity } from 'typeorm';
import { BaseEntityCustom } from './base.entity';

@Entity(`UserAnswerHistory`)
export class UserAnswerHistoryEntity extends BaseEntityCustom {
  @Column({ length: 500 })
  name: string;

  @Column({ length: 500 })
  description: string;

  @Column()
  avatar: string;

  @Column()
  questionId: string;

  @Column()
  quizId: string;

  @Column()
  userId: string;
}
