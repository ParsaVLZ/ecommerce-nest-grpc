import {
  BadRequestException,
  ConflictException,
  NotFoundException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

export function toRpcException(e: unknown): RpcException {
  if (e instanceof NotFoundException) {
    return new RpcException({ code: status.NOT_FOUND, message: e.message });
  }
  if (e instanceof ConflictException) {
    return new RpcException({ code: status.ALREADY_EXISTS, message: e.message });
  }
  if (e instanceof BadRequestException) {
    return new RpcException({ code: status.INVALID_ARGUMENT, message: e.message });
  }
  if (e instanceof ForbiddenException) {
    return new RpcException({ code: status.PERMISSION_DENIED, message: e.message });
  }
  if (e instanceof UnauthorizedException) {
    return new RpcException({ code: status.UNAUTHENTICATED, message: e.message });
  }
  return new RpcException({ code: status.INTERNAL, message: 'Internal error' });
}