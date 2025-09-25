import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './product.controller';
import { ProductsService } from './product.service';
import { ProductEntity } from './entities/product.entity';
import { ProductsGrpcController } from './product.grpc.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductsController, ProductsGrpcController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
