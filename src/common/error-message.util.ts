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

    return this.conflict();
  }

  static internalServerError() {
    return 'Internal server error';
  }

  static fromStatusCode(statusCode: number, entity?: string) {
    switch (statusCode) {
      case 400:
        return this.badRequest();
      case 401:
        return this.unauthorized();
      case 403:
        return this.forbidden();
      case 404:
        return this.notFound(entity);
      case 409:
        return this.conflict();
      default:
        return this.internalServerError();
    }
  }

  static throwNotFoundIfPrismaError(error: unknown, entity = 'Resource'): void {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      throw new NotFoundException(this.notFound(entity));
    }
  }
}
