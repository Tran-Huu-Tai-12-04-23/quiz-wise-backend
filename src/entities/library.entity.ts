import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntityCustom } from './base.entity';
import { QuizEntity } from './quiz.entity';
import { UserEntity } from './user.entity';

@Entity('Libraries')
export class LibraryEntity extends BaseEntityCustom {
  @Column({ length: 500 })
  name: string;

  @OneToMany(() => QuizEntity, (quiz) => quiz.library)
  quizzes: QuizEntity[];

  @Column()
  ownerId: string;
  @ManyToOne(() => UserEntity, (user) => user.libraries)
  owner: UserEntity;
}
