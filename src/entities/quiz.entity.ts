import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntityCustom } from './base.entity';
import { LibraryEntity } from './library.entity';
import { QuestionEntity } from './question.entity';
@Entity(`Quizzes`)
export class QuizEntity extends BaseEntityCustom {
  @Column({ length: 500 })
  name: string;

  @Column({ length: 500 })
  description: string;

  @Column()
  thumbnails: string;

  @OneToMany(() => QuestionEntity, (ques) => ques.quiz)
  questions: Promise<QuestionEntity[]>;

  @Column()
  libraryId: string;
  @ManyToOne(() => LibraryEntity, (library) => library.quizzes)
  @JoinColumn({ name: 'libraryId', referencedColumnName: 'id' })
  library: LibraryEntity;
}
