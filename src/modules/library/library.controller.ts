import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from 'src/entities/user.entity';
import { CurrentUser } from 'src/helpers/decorators';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { LibraryCreateDTO } from './dto/libraryCreate.dto';
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
  @Get()
  async findAll(@CurrentUser() user: UserEntity) {
    return await this.service.findAll(user);
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
