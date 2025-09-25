import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerConfigInit } from './config/swagger.config';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  swaggerConfigInit(app);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
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
