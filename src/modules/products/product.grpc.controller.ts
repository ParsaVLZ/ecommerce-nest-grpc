import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ProductsService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller()
export class ProductsGrpcController {
  constructor(private readonly products: ProductsService) {}

  @GrpcMethod('ProductsService', 'Create')
  create(data: CreateProductDto) {
    return this.products.create(data);
  }

  @GrpcMethod('ProductsService', 'FindAll')
  findAll({ page = 1, limit = 10 }: { page?: number; limit?: number }) {
    return this.products.findAll({ page, limit });
  }

  @GrpcMethod('ProductsService', 'FindOne')
  findOne({ id }: { id: number }) {
    return this.products.findOne(id);
  }

  @GrpcMethod('ProductsService', 'Update')
  update({ id, ...dto }: { id: number } & UpdateProductDto) {
    return this.products.update(id, dto);
  }

  @GrpcMethod('ProductsService', 'Remove')
  async remove({ id }: { id: number }) {
    await this.products.remove(id);
    return { success: true };
  }
}
