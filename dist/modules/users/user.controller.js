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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const pagination_dto_1 = require("../../common/dtos/pagination.dto");
const pagination_decorator_1 = require("../../common/decorators/pagination.decorator");
const swagger_consumes_enum_1 = require("../../common/enums/swagger-consumes.enum");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    create(dto) {
        return this.usersService.createUser(dto);
    }
    findAll(query) {
        return this.usersService.getAllUsers(query);
    }
    getOne(id) {
        return this.usersService.getUserById(id);
    }
    update(id, dto) {
        return this.usersService.updateUser(id, dto);
    }
    remove(id) {
        return this.usersService.removeUser(id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a user' }),
    (0, swagger_1.ApiConsumes)(swagger_consumes_enum_1.SwaggerConsumes.Json, swagger_consumes_enum_1.SwaggerConsumes.UrlEncoded),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'User created',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'number', example: 1 },
                name: { type: 'string', example: 'Parsa Valizadeh' },
                email: { type: 'string', example: 'parsavalizadeh@yahoo.com' },
                createdAt: { type: 'string', example: '2025-09-25T07:40:00.000Z' },
                updatedAt: { type: 'string', example: '2025-09-25T07:40:00.000Z' },
            },
        },
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Validation error' }),
    (0, swagger_1.ApiConflictResponse)({ description: 'Email already in use' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all users (paginated)' }),
    (0, pagination_decorator_1.Pagination)(),
    (0, swagger_1.ApiOkResponse)({
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
                            createdAt: { type: 'string', example: '2025-09-24T10:00:00.000Z' },
                            updatedAt: { type: 'string', example: '2025-09-24T10:00:00.000Z' },
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
                    { id: 2, name: 'Parsa Valizadeh', email: 'parsavalizadeh@yahoo.com', createdAt: '2025-09-24T10:00:00.000Z', updatedAt: '2025-09-24T10:00:00.000Z' },
                ],
                pagination: { total: 27, page: 1, limit: 10, pages: 3 },
            },
        },
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user by id' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'User found',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'number', example: 1 },
                name: { type: 'string', example: 'Parsa Valizadeh' },
                email: { type: 'string', example: 'parsavalizadeh@yahoo.com' },
                createdAt: { type: 'string', example: '2025-09-25T07:40:00.000Z' },
                updatedAt: { type: 'string', example: '2025-09-25T07:40:00.000Z' },
            },
        },
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'User not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update user by id' }),
    (0, swagger_1.ApiConsumes)(swagger_consumes_enum_1.SwaggerConsumes.Json, swagger_consumes_enum_1.SwaggerConsumes.UrlEncoded),
    (0, swagger_1.ApiOkResponse)({
        description: 'User updated',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'number', example: 1 },
                name: { type: 'string', example: 'Parsa' },
                email: { type: 'string', example: 'parsavalizadeh@yahoo.com' },
                createdAt: { type: 'string' },
                updatedAt: { type: 'string' },
            },
        },
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'User not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete user by id' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'User deleted',
        schema: { type: 'object', example: { success: true } },
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'User not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UsersController);
//# sourceMappingURL=user.controller.js.map