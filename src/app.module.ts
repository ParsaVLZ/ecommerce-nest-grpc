import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/user.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    ProductsModule,
    OrdersModule
  ],
})
export class AppModule {}
