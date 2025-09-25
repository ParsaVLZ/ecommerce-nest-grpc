import { ProductsService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsGrpcController {
    private readonly products;
    constructor(products: ProductsService);
    create(data: CreateProductDto): Promise<import("./entities/product.entity").ProductEntity>;
    findAll({ page, limit }: {
        page?: number;
        limit?: number;
    }): Promise<{
        products: import("./entities/product.entity").ProductEntity[];
        pagination: {
            totalItems: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne({ id }: {
        id: number;
    }): Promise<import("./entities/product.entity").ProductEntity>;
    update({ id, ...dto }: {
        id: number;
    } & UpdateProductDto): Promise<import("./entities/product.entity").ProductEntity>;
    remove({ id }: {
        id: number;
    }): Promise<{
        success: boolean;
    }>;
}
