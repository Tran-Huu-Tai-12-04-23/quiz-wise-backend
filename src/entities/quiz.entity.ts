import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntityCustom } from './base.entity';
import { Question } from './question.entity';
@Entity(`Quizzes`)
export class Quiz extends BaseEntityCustom {
  @Column({ length: 500 })
  name: string;

  @Column({ length: 500 })
  description: string;

  @Column()
  avatar: string;

  @OneToMany(() => Question, (ques) => ques.quiz)
  questions: Promise<Question[]>;
}
