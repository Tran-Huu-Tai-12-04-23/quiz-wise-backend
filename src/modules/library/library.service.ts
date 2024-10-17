import { Injectable } from '@nestjs/common';
import { enumData } from 'src/constants/enum-data';
import { LibraryEntity } from 'src/entities/library.entity';
import { UserEntity } from 'src/entities/user.entity';
import { LibraryRepository } from 'src/repositories/library.repository';
import { LibraryCreateDTO } from './dto/libraryCreate.dto';

@Injectable()
export class LibraryService {
  constructor(private readonly repo: LibraryRepository) {}

  async create(user: UserEntity, data: LibraryCreateDTO) {
    return this.repo.manager.transaction(async (manager) => {
      const repo = manager.getRepository(LibraryEntity);
      const library = new LibraryEntity();
      library.name = data.name;
      library.createdBy = user.id;
      library.createdAt = new Date();
      library.ownerId = user.id;
      await repo.insert(library);
      return {
        message: enumData.message.CREATE_SUCCESS,
      };
    });
  }

  findAll(user: UserEntity) {
    return this.repo.find({
      where: {
        ownerId: user.id,
        isDeleted: false,
      },
    });
  }

  async remove(id: string) {
    await this.repo.delete(id);

    return {
      message: enumData.message.DELETE_SUCCESS,
    };
  }
}
