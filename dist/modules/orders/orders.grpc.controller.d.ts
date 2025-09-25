import { OrdersService } from './orders.service';
export declare class OrdersGrpcController {
    private readonly orders;
    constructor(orders: OrdersService);
    create(data: {
        user_id: number;
        product_ids: number[];
    }): Promise<{
        id: number;
        user_id: number;
        product_ids: number[];
        total_amount: string;
        status: number;
        created_at: string;
        updated_at: string;
    }>;
    findAll({ page, limit }: {
        page?: number;
        limit?: number;
    }): Promise<{
        orders: {
            id: number;
            user_id: number;
            product_ids: number[];
            total_amount: string;
            status: number;
            created_at: string;
            updated_at: string;
        }[];
        total: number;
        page: number;
        limit: number;
        pages: number;
    }>;
    findOne({ id }: {
        id: number;
    }): Promise<{
        id: number;
        user_id: number;
        product_ids: number[];
        total_amount: string;
        status: number;
        created_at: string;
        updated_at: string;
    }>;
    updateStatus({ id, status }: {
        id: number;
        status: number;
    }): Promise<{
        id: number;
        user_id: number;
        product_ids: number[];
        total_amount: string;
        status: number;
        created_at: string;
        updated_at: string;
    }>;
    remove({ id }: {
        id: number;
    }): Promise<{
        success: boolean;
    }>;
}
