import { type CallHandler, type ExecutionContext, type NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Observable } from 'rxjs';
type SuccessResponse = {
    success: true;
    statusCode: number | undefined;
    message: string;
    data?: unknown;
    meta?: unknown;
};
export declare class TransformResponseInterceptor implements NestInterceptor {
    private reflector;
    constructor(reflector: Reflector);
    intercept(context: ExecutionContext, next: CallHandler): Observable<SuccessResponse>;
    private getMessage;
    private getEntityName;
}
export {};
