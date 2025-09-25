import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { OrderEntity } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import {
  paginationGenerator,
  paginationSolver,
} from 'src/common/utils/pagination.util';
import { UserEntity } from '../users/entities/user.entity';
import { ProductEntity } from '../products/entities/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepo: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
  ) {}

  async create(dto: CreateOrderDto) {
    this.ensureNonEmptyProducts(dto);

    await this.ensureUserExists(dto.userId);

    const { products, missing } = await this.fetchProducts(dto.productIds);
    if (missing.length > 0) {
      throw new NotFoundException(`Products not found: ${missing.join(', ')}`);
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

  async findAll(paginationDto: PaginationDto) {
    const { skip, limit, page } = paginationSolver(paginationDto);

    const [orders, total] = await this.orderRepo.findAndCount({
      skip,
      take: limit,
      order: { id: 'DESC' },
    });

    return {
      orders,
      pagination: paginationGenerator(total, page, limit),
    };
  }

  async findOne(id: number) {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async updateStatus(id: number, dto: UpdateOrderStatusDto) {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) throw new NotFoundException('Order not found');

    order.status = dto.status;
    return this.orderRepo.save(order);
  }

  async remove(id: number) {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) throw new NotFoundException('Order not found!');
    await this.orderRepo.delete(id);
  }

  private ensureNonEmptyProducts(dto: CreateOrderDto) {
    if (!dto.productIds || dto.productIds.length === 0) {
      throw new BadRequestException('productIds cannot be empty!');
    }
  }

  private async ensureUserExists(userId: number) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
  }

  private async fetchProducts(allIds: number[]) {
    const uniqueIds = Array.from(new Set(allIds));
    const products = await this.productRepo.find({ where: { id: In(uniqueIds) } });
    const found = new Set(products.map((p) => p.id));
    const missing = uniqueIds.filter((id) => !found.has(id));
    return { products, missing };
  }

  private buildQuantityMap(ids: number[]) {
    const out: { [id: number]: number } = {};
    for (const id of ids) out[id] = (out[id] || 0) + 1;
    return out;
  }

  private toCents(amount: number) {
    return Math.round(amount * 100);
  }

  private fromCents(cents: number) {
    return Number((cents / 100).toFixed(2));
  }

  private sumTotalCents(products: ProductEntity[], quantity: { [id: number]: number }) {
    let cents = 0;
    for (const p of products) {
      const units = quantity[p.id] || 0;
      if (units === 0) continue;
      const price = Number(p.price);
      const priceCents = this.toCents(price);
      cents += priceCents * units;
    }
    return cents;
  }
}
