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
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const product_service_1 = require("./product.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const pagination_dto_1 = require("../../common/dtos/pagination.dto");
const pagination_decorator_1 = require("../../common/decorators/pagination.decorator");
const swagger_consumes_enum_1 = require("../../common/enums/swagger-consumes.enum");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    create(dto) {
        return this.productsService.create(dto);
    }
    findAll(query) {
        return this.productsService.findAll(query);
    }
    findOne(id) {
        return this.productsService.findOne(id);
    }
    update(id, dto) {
        return this.productsService.update(id, dto);
    }
    remove(id) {
        return this.productsService.remove(id);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a product' }),
    (0, swagger_1.ApiConsumes)(swagger_consumes_enum_1.SwaggerConsumes.Json, swagger_consumes_enum_1.SwaggerConsumes.UrlEncoded),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Product created',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'number', example: 1 },
                name: { type: 'string', example: 'Zara Shoes' },
                price: { type: 'number', example: 80.99 },
                createdAt: { type: 'string' },
                updatedAt: { type: 'string' },
            },
        },
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Validation error' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all products (paginated)' }),
    (0, pagination_decorator_1.Pagination)(),
    (0, swagger_1.ApiOkResponse)({
        description: 'List of products with pagination',
        schema: {
            type: 'object',
            properties: {
                products: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', example: 2 },
                            name: { type: 'string', example: 'Boss Jacket' },
                            price: { type: 'number', example: 350.00 },
                            createdAt: { type: 'string' },
                            updatedAt: { type: 'string' },
                        },
                    },
                },
                pagination: {
                    type: 'object',
                    properties: {
                        total: { type: 'number', example: 42 },
                        page: { type: 'number', example: 1 },
                        limit: { type: 'number', example: 10 },
                        pages: { type: 'number', example: 5 },
                    },
                },
            },
            example: {
                products: [
                    { id: 2, name: 'Boss Jacket', price: 350.00, createdAt: '...', updatedAt: '...' },
                ],
                pagination: { total: 42, page: 1, limit: 10, pages: 5 },
            },
        },
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get product by id' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Product found',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'number', example: 1 },
                name: { type: 'string', example: 'Nike Shoes' },
                price: { type: 'number', example: 129.99 },
                createdAt: { type: 'string' },
                updatedAt: { type: 'string' },
            },
        },
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Product not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update product by id' }),
    (0, swagger_1.ApiConsumes)(swagger_consumes_enum_1.SwaggerConsumes.Json, swagger_consumes_enum_1.SwaggerConsumes.UrlEncoded),
    (0, swagger_1.ApiOkResponse)({
        description: 'Product updated',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                name: { type: 'string' },
                price: { type: 'number' },
                createdAt: { type: 'string' },
                updatedAt: { type: 'string' },
            },
        },
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Product not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete product by id' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Product deleted',
        schema: { type: 'object', example: { success: true } },
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Product not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "remove", null);
exports.ProductsController = ProductsController = __decorate([
    (0, swagger_1.ApiTags)('Products'),
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [product_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=product.controller.js.map