"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationSolver = paginationSolver;
exports.paginationGenerator = paginationGenerator;
function paginationSolver(paginationDto) {
    let rawPage = Number(paginationDto.page) || 1;
    let limit = Number(paginationDto.limit) || 10;
    if (rawPage < 1)
        rawPage = 1;
    if (limit < 1)
        limit = 10;
    const skip = (rawPage - 1) * limit;
    return {
        page: rawPage,
        limit,
        skip,
    };
}
function paginationGenerator(count = 0, page = 1, limit = 10) {
    return {
        totalItems: count,
        page: +page,
        limit: +limit,
        totalPages: Math.ceil(count / limit),
    };
}
//# sourceMappingURL=pagination.util.js.map