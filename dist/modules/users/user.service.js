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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const pagination_util_1 = require("../../common/utils/pagination.util");
let UserService = class UserService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async createUser(dto) {
        const exists = await this.userRepo.findOne({ where: { email: dto.email } });
        if (exists)
            throw new common_1.ConflictException('Email already in use!');
        const user = this.userRepo.create(dto);
        return this.userRepo.save(user);
    }
    async getAllUsers(paginationDto) {
        const { skip, limit, page } = (0, pagination_util_1.paginationSolver)(paginationDto);
        const [users, total] = await this.userRepo.findAndCount({
            skip,
            take: limit,
            order: { id: 'DESC' },
        });
        return {
            users,
            pagination: (0, pagination_util_1.paginationGenerator)(total, page, limit),
        };
    }
    async getUserById(id) {
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException('User not found!');
        return user;
    }
    async updateUser(id, dto) {
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException('User not found!');
        Object.assign(user, dto);
        return this.userRepo.save(user);
    }
    async removeUser(id) {
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException('User not found!');
        await this.userRepo.delete(id);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map