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
exports.ProductsGrpcController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const product_service_1 = require("./product.service");
const create_product_dto_1 = require("./dto/create-product.dto");
let ProductsGrpcController = class ProductsGrpcController {
    constructor(products) {
        this.products = products;
    }
    create(data) {
        return this.products.create(data);
    }
    findAll({ page = 1, limit = 10 }) {
        return this.products.findAll({ page, limit });
    }
    findOne({ id }) {
        return this.products.findOne(id);
    }
    update({ id, ...dto }) {
        return this.products.update(id, dto);
    }
    async remove({ id }) {
        await this.products.remove(id);
        return { success: true };
    }
};
exports.ProductsGrpcController = ProductsGrpcController;
__decorate([
    (0, microservices_1.GrpcMethod)('ProductsService', 'Create'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", void 0)
], ProductsGrpcController.prototype, "create", null);
__decorate([
    (0, microservices_1.GrpcMethod)('ProductsService', 'FindAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductsGrpcController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.GrpcMethod)('ProductsService', 'FindOne'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductsGrpcController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.GrpcMethod)('ProductsService', 'Update'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductsGrpcController.prototype, "update", null);
__decorate([
    (0, microservices_1.GrpcMethod)('ProductsService', 'Remove'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsGrpcController.prototype, "remove", null);
exports.ProductsGrpcController = ProductsGrpcController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [product_service_1.ProductsService])
], ProductsGrpcController);
//# sourceMappingURL=product.grpc.controller.js.map