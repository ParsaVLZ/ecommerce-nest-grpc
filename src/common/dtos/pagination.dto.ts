import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsNumber, Min } from 'class-validator';

export class PaginationDto {
  @ApiPropertyOptional({ type: 'integer', example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'page must be a number' })
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ type: 'integer', example: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'limit must be a number' })
  @Min(1)
  limit?: number;
}
