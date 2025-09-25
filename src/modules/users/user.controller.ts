import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
  ApiConsumes,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Pagination } from 'src/common/decorators/pagination.decorator';
import { SwaggerConsumes } from 'src/common/enums/swagger-consumes.enum';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  @ApiCreatedResponse({
    description: 'User created',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        name: { type: 'string', example: 'Parsa Valizadeh' },
        email: { type: 'string', example: 'parsavalizadeh@yahoo.com' },
        created_at: { type: 'string', example: '2025-09-25T07:40:00.000Z' },
        updated_at: { type: 'string', example: '2025-09-25T07:40:00.000Z' },
      },
    },
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiConflictResponse({ description: 'Email already in use' })
  create(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users (paginated)' })
  @Pagination()
  @ApiOkResponse({
    description: 'List of users with pagination',
    schema: {
      type: 'object',
      properties: {
        users: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 2 },
              name: { type: 'string', example: 'Parsa Valizadeh' },
              email: { type: 'string', example: 'parsavalizadeh@yahoo.com' },
              created_at: { type: 'string', example: '2025-09-24T10:00:00.000Z' },
              updated_at: { type: 'string', example: '2025-09-24T10:00:00.000Z' },
            },
          },
        },
        pagination: {
          type: 'object',
          properties: {
            total: { type: 'number', example: 20 },
            page: { type: 'number', example: 1 },
            limit: { type: 'number', example: 10 },
            pages: { type: 'number', example: 3 },
          },
        },
      },
      example: {
        users: [
          { id: 2, name: 'Parsa Valizadeh', email: 'parsavalizadeh@yahoo.com', created_at: '2025-09-24T10:00:00.000Z', updated_at: '2025-09-24T10:00:00.000Z' },
        ],
        pagination: { total: 27, page: 1, limit: 10, pages: 3 },
      },
    },
  })
  findAll(@Query() query: PaginationDto) {
    return this.usersService.getAllUsers(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiOkResponse({
    description: 'User found',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        name: { type: 'string', example: 'Parsa Valizadeh' },
        email: { type: 'string', example: 'parsavalizadeh@yahoo.com' },
        created_at: { type: 'string', example: '2025-09-25T07:40:00.000Z' },
        updated_at: { type: 'string', example: '2025-09-25T07:40:00.000Z' },
      },
    },
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user by id' })
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  @ApiOkResponse({
    description: 'User updated',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        name: { type: 'string', example: 'Parsa' },
        email: { type: 'string', example: 'parsavalizadeh@yahoo.com' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
      },
    },
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
    return this.usersService.updateUser(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiOkResponse({
    description: 'User deleted',
    schema: { type: 'object', example: { success: true } },
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.removeUser(id);
  }
}
