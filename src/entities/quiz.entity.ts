import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntityCustom } from './base.entity';
import { QuestionEntity } from './question.entity';
@Entity(`Quizzes`)
export class QuizEntity extends BaseEntityCustom {
  @Column({ length: 500 })
  name: string;

  @Column({ length: 500 })
  description: string;

  @Column()
  avatar: string;

  @OneToMany(() => QuestionEntity, (ques) => ques.quiz)
  questions: Promise<QuestionEntity[]>;
}
