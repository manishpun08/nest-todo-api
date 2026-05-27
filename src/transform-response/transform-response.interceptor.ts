import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Response } from 'express';
import { map } from 'rxjs/operators';
import { SuccessMessageUtil } from '../common/message.util';

type SuccessResponse = {
  success: true;
  statusCode: number | undefined;
  message: string;
  data?: unknown;
  meta?: unknown;
};

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<SuccessResponse> {
    const request = context
      .switchToHttp()
      .getRequest<{ method: string; url: string }>();
    const res = context.switchToHttp().getResponse<Response>();
    const entity = this.getEntityName(request.url);

    return next.handle().pipe(
      map((response: any) => {
        const isPaginated =
          response &&
          response.items !== undefined &&
          response.meta !== undefined;
        const data = isPaginated ? response.items : response;
        const meta = isPaginated ? response.meta : undefined;

        return {
          success: true,
          statusCode: res.statusCode,
          message: this.getMessage(request.method, entity, data),
          ...(request.method === 'DELETE' ? {} : { data }),
          ...(meta ? { meta } : {}),
        };
      }),
    );
  }

  private getMessage(method: string, entity: string, data: unknown) {
    if (method === 'POST') {
      return SuccessMessageUtil.created(entity);
    }

    if (method === 'PATCH' || method === 'PUT') {
      return SuccessMessageUtil.updated(entity);
    }

    if (method === 'DELETE') {
      return SuccessMessageUtil.deleted(entity);
    }

    if (method === 'GET' && Array.isArray(data)) {
      return SuccessMessageUtil.listFetched(entity);
    }

    return SuccessMessageUtil.fetched(entity);
  }

  private getEntityName(url: string) {
    const [firstSegment] = url.split('?')[0].split('/').filter(Boolean);

    if (!firstSegment) {
      return 'Resource';
    }

    const singular = firstSegment.endsWith('s')
      ? firstSegment.slice(0, -1)
      : firstSegment;

    return singular.charAt(0).toUpperCase() + singular.slice(1);
  }
}
