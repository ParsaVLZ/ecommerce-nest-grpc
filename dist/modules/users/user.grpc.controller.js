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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersGrpcController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
let UsersGrpcController = class UsersGrpcController {
    constructor(users) {
        this.users = users;
    }
    create(data) {
        return this.users.createUser(data);
    }
    findAll({ page = 1, limit = 10 }) {
        return this.users.getAllUsers({ page, limit });
    }
    findOne({ id }) {
        return this.users.getUserById(id);
    }
    update({ id, ...dto }) {
        return this.users.updateUser(id, dto);
    }
    remove({ id }) {
        return this.users.removeUser(id);
    }
};
exports.UsersGrpcController = UsersGrpcController;
__decorate([
    (0, microservices_1.GrpcMethod)('UsersService', 'Create'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UsersGrpcController.prototype, "create", null);
__decorate([
    (0, microservices_1.GrpcMethod)('UsersService', 'FindAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersGrpcController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.GrpcMethod)('UsersService', 'FindOne'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersGrpcController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.GrpcMethod)('UsersService', 'Update'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersGrpcController.prototype, "update", null);
__decorate([
    (0, microservices_1.GrpcMethod)('UsersService', 'Remove'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersGrpcController.prototype, "remove", null);
exports.UsersGrpcController = UsersGrpcController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UsersGrpcController);
//# sourceMappingURL=user.grpc.controller.js.map