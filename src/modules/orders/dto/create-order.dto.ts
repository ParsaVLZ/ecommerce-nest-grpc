import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsInt, Min } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: 1, description: 'Existing user id' })
  @IsInt()
  @Min(1)
  userId: number;

  @ApiProperty({
    example: [2, 3, 3, 5],
    description: 'List of product IDs (duplicates allowed to count quantity)',
    type: [Number],
  })
  @IsArray()
  @ArrayNotEmpty()
  productIds: number[];
}
