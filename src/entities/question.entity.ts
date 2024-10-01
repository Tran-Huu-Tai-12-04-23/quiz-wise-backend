import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntityCustom } from './base.entity';
import { Quiz } from './quiz.entity';
@Entity(`Questions`)
export class Question extends BaseEntityCustom {
  @Column({ length: 500 })
  title: string;

  @Column({ length: 500 })
  options: string;

  @Column()
  correctAnswerIndex: string;

  @Column()
  quizId: string;
  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  @JoinColumn({ name: 'quizId', referencedColumnName: 'id' })
  quiz: Quiz;
}
