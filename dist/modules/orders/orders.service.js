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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entities/order.entity");
const pagination_util_1 = require("../../common/utils/pagination.util");
const user_entity_1 = require("../users/entities/user.entity");
const product_entity_1 = require("../products/entities/product.entity");
let OrdersService = class OrdersService {
    constructor(orderRepo, userRepo, productRepo) {
        this.orderRepo = orderRepo;
        this.userRepo = userRepo;
        this.productRepo = productRepo;
    }
    async create(dto) {
        this.ensureNonEmptyProducts(dto);
        await this.ensureUserExists(dto.userId);
        const { products, missing } = await this.fetchProducts(dto.productIds);
        if (missing.length > 0) {
            throw new common_1.NotFoundException(`Products not found: ${missing.join(', ')}`);
        }
        const quantity = this.buildQuantityMap(dto.productIds);
        const totalCents = this.sumTotalCents(products, quantity);
        const totalAmount = this.fromCents(totalCents);
        const order = this.orderRepo.create({
            userId: dto.userId,
            productIds: dto.productIds,
            totalAmount
        });
        return this.orderRepo.save(order);
    }
    async findAll(paginationDto) {
        const { skip, limit, page } = (0, pagination_util_1.paginationSolver)(paginationDto);
        const [orders, total] = await this.orderRepo.findAndCount({
            skip,
            take: limit,
            order: { id: 'DESC' },
        });
        return {
            orders,
            pagination: (0, pagination_util_1.paginationGenerator)(total, page, limit),
        };
    }
    async findOne(id) {
        const order = await this.orderRepo.findOne({ where: { id } });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        return order;
    }
    async updateStatus(id, dto) {
        const order = await this.orderRepo.findOne({ where: { id } });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        order.status = dto.status;
        return this.orderRepo.save(order);
    }
    async remove(id) {
        const order = await this.orderRepo.findOne({ where: { id } });
        if (!order)
            throw new common_1.NotFoundException('Order not found!');
        await this.orderRepo.delete(id);
    }
    ensureNonEmptyProducts(dto) {
        if (!dto.productIds || dto.productIds.length === 0) {
            throw new common_1.BadRequestException('productIds cannot be empty!');
        }
    }
    async ensureUserExists(userId) {
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
    }
    async fetchProducts(allIds) {
        const uniqueIds = Array.from(new Set(allIds));
        const products = await this.productRepo.find({ where: { id: (0, typeorm_2.In)(uniqueIds) } });
        const found = new Set(products.map((p) => p.id));
        const missing = uniqueIds.filter((id) => !found.has(id));
        return { products, missing };
    }
    buildQuantityMap(ids) {
        const out = {};
        for (const id of ids)
            out[id] = (out[id] || 0) + 1;
        return out;
    }
    toCents(amount) {
        return Math.round(amount * 100);
    }
    fromCents(cents) {
        return Number((cents / 100).toFixed(2));
    }
    sumTotalCents(products, quantity) {
        let cents = 0;
        for (const p of products) {
            const units = quantity[p.id] || 0;
            if (units === 0)
                continue;
            const price = Number(p.price);
            const priceCents = this.toCents(price);
            cents += priceCents * units;
        }
        return cents;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.OrderEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrdersService);
//# sourceMappingURL=orders.service.js.map