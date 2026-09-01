"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMessageUtil = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../generated/prisma");
class ErrorMessageUtil {
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
    static conflictEntity(entity) {
        if (entity && entity.trim().length > 0) {
            return `${entity} already exists`;
        }
        return ErrorMessageUtil.conflict();
    }
    static internalServerError() {
        return 'Internal server error';
    }
    static fromStatusCode(statusCode, entity) {
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
    static throwNotFoundIfPrismaError(error, entity = 'Resource') {
        if (error instanceof prisma_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            throw new common_1.NotFoundException(ErrorMessageUtil.notFound(entity));
        }
    }
}
exports.ErrorMessageUtil = ErrorMessageUtil;
//# sourceMappingURL=error-message.util.js.map