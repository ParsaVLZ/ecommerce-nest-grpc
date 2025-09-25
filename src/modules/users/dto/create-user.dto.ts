import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Parsa Valizadeh',
    description: 'Your full name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'parsavalizadeh@yahoo.com',
    description: 'Your unique email address',
  })
  @IsEmail()
  email: string;
}
