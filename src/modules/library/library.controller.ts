import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/dto/pagination.dto';
import { UserEntity } from 'src/entities/user.entity';
import { CurrentUser } from 'src/helpers/decorators';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { AddQuizToLibraryDTO, LibraryCreateDTO } from './dto/libraryCreate.dto';
import { LibraryService } from './library.service';

@ApiTags('library')
@UseGuards(JwtAuthGuard)
@Controller('library')
export class LibraryController {
  constructor(private readonly service: LibraryService) {}

  @ApiOperation({
    summary: 'Create a new library',
  })
  @ApiResponse({ status: 201 })
  @Post()
  async create(
    @CurrentUser() user: UserEntity,
    @Body() body: LibraryCreateDTO,
  ) {
    return await this.service.create(user, body);
  }

  @ApiOperation({
    summary: 'Get all libraries for the current user',
  })
  @ApiResponse({ status: 200 })
  @Post('pagination')
  async findAll(@CurrentUser() user: UserEntity, @Body() body: PaginationDto) {
    return await this.service.findAll(user, body);
  }

  @ApiOperation({
    summary: 'Add quiz to lib',
  })
  @ApiResponse({ status: 200 })
  @Post('add-quiz')
  async addQuiz(
    @CurrentUser() user: UserEntity,
    @Body() body: AddQuizToLibraryDTO,
  ) {
    return await this.service.addQuiz(user, body);
  }
  @ApiOperation({
    summary: 'Delete a library by ID',
  })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.service.remove(id);
  }
}
