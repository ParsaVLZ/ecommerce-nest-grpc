import { ProductsService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(dto: CreateProductDto): Promise<import("./entities/product.entity").ProductEntity>;
    findAll(query: PaginationDto): Promise<{
        products: import("./entities/product.entity").ProductEntity[];
        pagination: {
            totalItems: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<import("./entities/product.entity").ProductEntity>;
    update(id: number, dto: UpdateProductDto): Promise<import("./entities/product.entity").ProductEntity>;
    remove(id: number): Promise<void>;
}
