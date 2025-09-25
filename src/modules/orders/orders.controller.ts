import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
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
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Pagination } from 'src/common/decorators/pagination.decorator';
import { SwaggerConsumes } from 'src/common/enums/swagger-consumes.enum';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({
    summary: 'Create order',
    description:
      'Creates an order from userId and productIds[], computes totalAmount and sets status = CREATED.',
  })
  @ApiConsumes(SwaggerConsumes.Json)
  @ApiBody({ type: CreateOrderDto })
  @ApiCreatedResponse({
    description: 'Order created',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 10 },
        userId: { type: 'number', example: 1 },
        productIds: { type: 'array', items: { type: 'number' }, example: [1, 1, 2] },
        totalAmount: { type: 'number', example: 1400.99 },
        status: { type: 'string', example: 'CREATED' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
      },
    },
  })
  @ApiBadRequestResponse({ description: 'Validation error or empty productIds' })
  create(@Body() dto: CreateOrderDto) {
    return this.ordersService.create(dto);
  }

  @Get()
  @Pagination()
  @ApiOperation({
    summary: 'List orders',
    description: 'Returns a paginated list of orders',
  })
  @ApiOkResponse({
    description: 'Orders returned (paginated)',
    schema: {
      type: 'object',
      properties: {
        orders: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 10 },
              userId: { type: 'number', example: 1 },
              productIds: { type: 'array', items: { type: 'number' }, example: [1, 2] },
              totalAmount: { type: 'number', example: 1400.99 },
              status: { type: 'string', example: 'PAID' },
              created_at: { type: 'string' },
              updated_at: { type: 'string' },
            },
          },
        },
        pagination: {
          type: 'object',
          properties: {
            total: { type: 'number', example: 12 },
            page: { type: 'number', example: 1 },
            limit: { type: 'number', example: 10 },
            pages: { type: 'number', example: 2 },
          },
        },
      },
    },
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.ordersService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by id' })
  @ApiOkResponse({
    description: 'Order found',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        userId: { type: 'number' },
        productIds: { type: 'array', items: { type: 'number' } },
        totalAmount: { type: 'number' },
        status: { type: 'string', example: 'CREATED' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Order not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id/status')
  @ApiOperation({
    summary: 'Update order status',
    description: 'Sets status to one of CREATED, PAID, SHIPPED.',
  })
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  @ApiBody({ type: UpdateOrderStatusDto })
  @ApiOkResponse({
    description: 'Order status updated',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        userId: { type: 'number' },
        productIds: { type: 'array', items: { type: 'number' } },
        totalAmount: { type: 'number' },
        status: { type: 'string', example: 'SHIPPED' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Order not found' })
  updateStatus(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateOrderStatusDto) {
    return this.ordersService.updateStatus(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete order by id' })
  @ApiOkResponse({
    description: 'Order deleted',
    schema: { type: 'object', example: { success: true } },
  })
  @ApiNotFoundResponse({ description: 'Order not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.remove(id);
  }
}
