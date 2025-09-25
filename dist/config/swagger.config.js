"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerConfigInit = void 0;
const swagger_1 = require("@nestjs/swagger");
const swaggerConfigInit = (app) => {
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Test Backend')
        .setDescription('API documentation')
        .setVersion('v1.0.0')
        .setContact('Parsa Valizadeh', '', 'parsavalizadeh@yahoo.com')
        .addBearerAuth(SwaggerAuthConfig(), 'Authorization')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('swagger', app, document);
};
exports.swaggerConfigInit = swaggerConfigInit;
const SwaggerAuthConfig = () => ({
    type: 'http',
    in: 'header',
    scheme: 'bearer',
    bearerFormat: 'JWT',
});
//# sourceMappingURL=swagger.config.js.map