import { NotFoundException } from '@nestjs/common';
import { Prisma } from '../../generated/prisma';

export class ErrorMessageUtil {
  static badRequest() {
    return 'Bad request';
  }

  static unauthorized() {
    return 'Unauthorized';
  }

  static forbidden() {
    return 'Forbidden';
  }

  static notFound(entity = 'Resource') {
    return `${entity} not found`;
  }

  static conflict() {
    return 'Conflict';
  }

  static conflictEntity(entity?: string) {
    if (entity && entity.trim().length > 0) {
      return `${entity} already exists`;
    }

    return ErrorMessageUtil.conflict();
  }

  static internalServerError() {
    return 'Internal server error';
  }

  static fromStatusCode(statusCode: number, entity?: string) {
    switch (statusCode) {
      case 400:
        return ErrorMessageUtil.badRequest();
      case 401:
        return ErrorMessageUtil.unauthorized();
      case 403:
        return ErrorMessageUtil.forbidden();
      case 404:
        return ErrorMessageUtil.notFound(entity);
      case 409:
        return ErrorMessageUtil.conflict();
      default:
        return ErrorMessageUtil.internalServerError();
    }
  }

  static throwNotFoundIfPrismaError(error: unknown, entity = 'Resource'): void {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      throw new NotFoundException(ErrorMessageUtil.notFound(entity));
    }
  }
}
