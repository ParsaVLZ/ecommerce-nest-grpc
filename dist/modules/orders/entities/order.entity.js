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
exports.OrderEntity = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/abstracts/base.entity");
const entity_name_enum_1 = require("../../../common/enums/entity-name.enum");
const order_status_enum_1 = require("../../../common/enums/order-status.enum");
let OrderEntity = class OrderEntity extends base_entity_1.BaseEntity {
};
exports.OrderEntity = OrderEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'int' }),
    __metadata("design:type", Number)
], OrderEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_ids', type: 'json' }),
    __metadata("design:type", Array)
], OrderEntity.prototype, "productIds", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_amount', type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], OrderEntity.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: order_status_enum_1.OrderStatus, default: order_status_enum_1.OrderStatus.CREATED }),
    __metadata("design:type", String)
], OrderEntity.prototype, "status", void 0);
exports.OrderEntity = OrderEntity = __decorate([
    (0, typeorm_1.Entity)(entity_name_enum_1.EntityName.ORDER)
], OrderEntity);
//# sourceMappingURL=order.entity.js.map