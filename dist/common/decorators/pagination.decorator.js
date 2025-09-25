"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = Pagination;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
function Pagination() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiQuery)({ name: "page", example: 1, required: false, type: "integer" }), (0, swagger_1.ApiQuery)({ name: "limit", example: 10, required: false, type: "integer" }));
}
//# sourceMappingURL=pagination.decorator.js.map