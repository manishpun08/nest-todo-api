import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Response } from 'express';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<{
    success: true;
    statusCode: number | undefined;
    message: string;
    data: unknown;
  }> {
    const res = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((data: unknown) => ({
        success: true,
        statusCode: res.statusCode,
        message: 'Request successful',
        data,
      })),
    );
  }
}
