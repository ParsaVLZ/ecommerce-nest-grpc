import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { UsersGrpcController } from './user.grpc.controller';


@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController, UsersGrpcController],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
