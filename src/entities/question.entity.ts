import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntityCustom } from './base.entity';
import { QuizEntity } from './quiz.entity';
@Entity(`Questions`)
export class QuestionEntity extends BaseEntityCustom {
  @Column({ length: 500 })
  title: string;

  @Column({ length: 500 })
  options: string;

  @Column()
  correctAnswerIndex: string;

  @Column()
  quizId: string;
  @ManyToOne(() => QuizEntity, (quiz) => quiz.questions)
  @JoinColumn({ name: 'quizId', referencedColumnName: 'id' })
  quiz: QuizEntity;
}
