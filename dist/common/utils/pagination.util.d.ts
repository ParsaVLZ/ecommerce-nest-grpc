import { PaginationDto } from "../dtos/pagination.dto";
export declare function paginationSolver(paginationDto: PaginationDto): {
    page: number;
    limit: number;
    skip: number;
};
export declare function paginationGenerator(count?: number, page?: number, limit?: number): {
    totalItems: number;
    page: number;
    limit: number;
    totalPages: number;
};
