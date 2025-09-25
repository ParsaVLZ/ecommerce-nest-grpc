import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
export declare class ProductsService {
    private readonly productRepo;
    constructor(productRepo: Repository<ProductEntity>);
    create(dto: CreateProductDto): Promise<ProductEntity>;
    findAll(paginationDto: PaginationDto): Promise<{
        products: ProductEntity[];
        pagination: {
            totalItems: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<ProductEntity>;
    update(id: number, dto: UpdateProductDto): Promise<ProductEntity>;
    remove(id: number): Promise<void>;
}
