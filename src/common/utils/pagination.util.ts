import { PaginationDto } from "../dtos/pagination.dto";

export function paginationSolver(paginationDto: PaginationDto) {
    let rawPage = Number(paginationDto.page) || 1;
    let limit = Number(paginationDto.limit) || 10;
  
    if (rawPage < 1) rawPage = 1;
    if (limit < 1) limit = 10;
  
    const skip = (rawPage - 1) * limit;
  
    return {
      page: rawPage,
      limit,
      skip,
    };
}

export function paginationGenerator(count: number = 0, page: number = 1, limit: number = 10) {
    return {
        totalItems: count,
        page: +page,
        limit: +limit,
        totalPages: Math.ceil(count / limit),
    };
}