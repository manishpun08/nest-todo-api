export declare class ErrorMessageUtil {
    static badRequest(): string;
    static unauthorized(): string;
    static forbidden(): string;
    static notFound(entity?: string): string;
    static conflict(): string;
    static conflictEntity(entity?: string): string;
    static internalServerError(): string;
    static fromStatusCode(statusCode: number, entity?: string): string;
    static throwNotFoundIfPrismaError(error: unknown, entity?: string): void;
}
