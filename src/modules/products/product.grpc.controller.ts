import { BadRequestException, Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ProductsService } from './product.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { toRpcException } from 'src/common/exceptions/grpc-exception.util';

@Controller()
export class ProductsGrpcController {
  constructor(private readonly products: ProductsService) {}

  @GrpcMethod('ProductsService', 'Create')
  async create(data: { name: string; price: string }) {
    try {
      const price = Number(data.price);
      if (Number.isNaN(price)) {
        throw new BadRequestException('price must be a number');
      }
      return await this.products.create({ name: data.name, price });
    } catch (e) {
      throw toRpcException(e);
    }
  }

  @GrpcMethod('ProductsService', 'FindAll')
  async findAll({ page = 1, limit = 10 }: { page?: number; limit?: number }) {
    try {
      return await this.products.findAll({ page, limit });
    } catch (e) {
      throw toRpcException(e);
    }
  }

  @GrpcMethod('ProductsService', 'FindOne')
  async findOne({ id }: { id: number }) {
    try {
      return await this.products.findOne(id);
    } catch (e) {
      throw toRpcException(e);
    }
  }

  @GrpcMethod('ProductsService', 'Update')
  async update({ id, name, price }: { id: number; name?: string; price?: string }) {
    try {
      const dto: UpdateProductDto = { name };
      if (price !== undefined) {
        const parsed = Number(price);
        if (Number.isNaN(parsed)) {
          throw new BadRequestException('price must be a number');
        }
        dto.price = parsed;
      }
      return await this.products.update(id, dto);
    } catch (e) {
      throw toRpcException(e);
    }
  }

  @GrpcMethod('ProductsService', 'Remove')
  async remove({ id }: { id: number }) {
    try {
      await this.products.remove(id);
      return { success: true };
    } catch (e) {
      throw toRpcException(e);
    }
  }
}
