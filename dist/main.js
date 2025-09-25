"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_config_1 = require("./config/swagger.config");
const microservices_1 = require("@nestjs/microservices");
const dotenv = require("dotenv");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    dotenv.config();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
    (0, swagger_config_1.swaggerConfigInit)(app);
    app.connectMicroservice({
        transport: microservices_1.Transport.GRPC,
        options: {
            package: ['users', 'products', 'orders'],
            protoPath: [
                __dirname + '/grpc/proto/users.proto',
                __dirname + '/grpc/proto/products.proto',
                __dirname + '/grpc/proto/orders.proto',
            ],
            url: process.env.GRPC_URL || '0.0.0.0:50051',
        },
    });
    await app.startAllMicroservices();
    await app.listen(process.env.PORT || 3000);
    console.log(`HTTP server running on http://localhost:${process.env.PORT || 3000}`);
    console.log(`Swagger docs at http://localhost:${process.env.PORT || 3000}/swagger`);
    console.log(`gRPC server running at ${process.env.GRPC_URL || '0.0.0.0:50051'}`);
}
bootstrap();
//# sourceMappingURL=main.js.map