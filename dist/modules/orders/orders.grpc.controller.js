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
exports.OrdersGrpcController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const orders_service_1 = require("./orders.service");
const order_status_enum_1 = require("../../common/enums/order-status.enum");
const numToStatus = {
    0: order_status_enum_1.OrderStatus.CREATED,
    1: order_status_enum_1.OrderStatus.PAID,
    2: order_status_enum_1.OrderStatus.SHIPPED,
};
const statusToNum = {
    [order_status_enum_1.OrderStatus.CREATED]: 0,
    [order_status_enum_1.OrderStatus.PAID]: 1,
    [order_status_enum_1.OrderStatus.SHIPPED]: 2,
};
function toProtoOrder(o) {
    return {
        id: o.id,
        user_id: o.userId,
        product_ids: o.productIds,
        total_amount: o.totalAmount.toFixed(2),
        status: statusToNum[o.status],
        created_at: o.created_at.toISOString(),
        updated_at: o.updated_at.toISOString()
    };
}
let OrdersGrpcController = class OrdersGrpcController {
    constructor(orders) {
        this.orders = orders;
    }
    async create(data) {
        const created = await this.orders.create({
            userId: data.user_id,
            productIds: data.product_ids,
        });
        return toProtoOrder(created);
    }
    async findAll({ page = 1, limit = 10 }) {
        const { orders, pagination } = await this.orders.findAll({ page, limit });
        return {
            orders: orders.map(toProtoOrder),
            total: pagination.totalItems,
            page: pagination.page,
            limit: pagination.limit,
            pages: pagination.totalPages,
        };
    }
    async findOne({ id }) {
        const o = await this.orders.findOne(id);
        return toProtoOrder(o);
    }
    async updateStatus({ id, status }) {
        const mapped = numToStatus[status];
        const updated = await this.orders.updateStatus(id, { status: mapped });
        return toProtoOrder(updated);
    }
    async remove({ id }) {
        await this.orders.remove(id);
        return { success: true };
    }
};
exports.OrdersGrpcController = OrdersGrpcController;
__decorate([
    (0, microservices_1.GrpcMethod)('OrdersService', 'Create'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersGrpcController.prototype, "create", null);
__decorate([
    (0, microservices_1.GrpcMethod)('OrdersService', 'FindAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersGrpcController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.GrpcMethod)('OrdersService', 'FindOne'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersGrpcController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.GrpcMethod)('OrdersService', 'UpdateStatus'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersGrpcController.prototype, "updateStatus", null);
__decorate([
    (0, microservices_1.GrpcMethod)('OrdersService', 'Remove'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersGrpcController.prototype, "remove", null);
exports.OrdersGrpcController = OrdersGrpcController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersGrpcController);
//# sourceMappingURL=orders.grpc.controller.js.map