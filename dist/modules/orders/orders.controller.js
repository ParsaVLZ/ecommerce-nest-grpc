"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const orders_service_1 = require("./orders.service");
const create_order_dto_1 = require("./dto/create-order.dto");
const update_order_status_dto_1 = require("./dto/update-order-status.dto");
const pagination_dto_1 = require("../../common/dtos/pagination.dto");
const pagination_decorator_1 = require("../../common/decorators/pagination.decorator");
const swagger_consumes_enum_1 = require("../../common/enums/swagger-consumes.enum");
let OrdersController = class OrdersController {
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    create(dto) {
        return this.ordersService.create(dto);
    }
    findAll(paginationDto) {
        return this.ordersService.findAll(paginationDto);
    }
    findOne(id) {
        return this.ordersService.findOne(id);
    }
    updateStatus(id, dto) {
        return this.ordersService.updateStatus(id, dto);
    }
    remove(id) {
        return this.ordersService.remove(id);
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create order',
        description: 'Creates an order from userId and productIds[], computes totalAmount and sets status = CREATED.',
    }),
    (0, swagger_1.ApiConsumes)(swagger_consumes_enum_1.SwaggerConsumes.Json, swagger_consumes_enum_1.SwaggerConsumes.UrlEncoded),
    (0, swagger_1.ApiBody)({ type: create_order_dto_1.CreateOrderDto }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Order created',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'number', example: 10 },
                userId: { type: 'number', example: 1 },
                productIds: { type: 'array', items: { type: 'number' }, example: [1, 1, 2] },
                totalAmount: { type: 'number', example: 1400.99 },
                status: { type: 'string', example: 'CREATED' },
                createdAt: { type: 'string' },
                updatedAt: { type: 'string' },
            },
        },
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Validation error or empty productIds' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, pagination_decorator_1.Pagination)(),
    (0, swagger_1.ApiOperation)({
        summary: 'List orders',
        description: 'Returns a paginated list of orders',
    }),
    (0, swagger_1.ApiOkResponse)({
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
                            createdAt: { type: 'string' },
                            updatedAt: { type: 'string' },
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
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get order by id' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Order found',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                userId: { type: 'number' },
                productIds: { type: 'array', items: { type: 'number' } },
                totalAmount: { type: 'number' },
                status: { type: 'string', example: 'CREATED' },
                createdAt: { type: 'string' },
                updatedAt: { type: 'string' },
            },
        },
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Order not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update order status',
        description: 'Sets status to one of CREATED, PAID, SHIPPED.',
    }),
    (0, swagger_1.ApiConsumes)(swagger_consumes_enum_1.SwaggerConsumes.Json, swagger_consumes_enum_1.SwaggerConsumes.UrlEncoded),
    (0, swagger_1.ApiBody)({ type: update_order_status_dto_1.UpdateOrderStatusDto }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Order status updated',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                userId: { type: 'number' },
                productIds: { type: 'array', items: { type: 'number' } },
                totalAmount: { type: 'number' },
                status: { type: 'string', example: 'SHIPPED' },
                createdAt: { type: 'string' },
                updatedAt: { type: 'string' },
            },
        },
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Order not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_order_status_dto_1.UpdateOrderStatusDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete order by id' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Order deleted',
        schema: { type: 'object', example: { success: true } },
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Order not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "remove", null);
exports.OrdersController = OrdersController = __decorate([
    (0, swagger_1.ApiTags)('Orders'),
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
//# sourceMappingURL=orders.controller.js.map