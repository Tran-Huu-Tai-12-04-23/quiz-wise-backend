import { LibraryEntity } from 'src/entities/library.entity';
import { CustomRepository } from 'src/typeorm/typeorm-decorater';
import { Repository } from 'typeorm';

@CustomRepository(LibraryEntity)
export class LibraryRepository extends Repository<LibraryEntity> {}
