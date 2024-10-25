import { IsNumber, IsObject, IsOptional } from 'class-validator';

export class PaginationDto {
  @IsObject()
  @IsOptional()
  where?: any;

  @IsObject()
  @IsOptional()
  order?: any;

  @IsNumber()
  skip: number;

  @IsNumber()
  take: number;
}
