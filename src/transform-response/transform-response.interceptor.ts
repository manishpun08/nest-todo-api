import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Response } from 'express';
import { map } from 'rxjs/operators';
import { SuccessMessageUtil } from '../common/message.util';
import { ENTITY_KEY, MESSAGE_KEY } from '../common/decorators/entity.decorator';

type SuccessResponse = {
  success: true;
  statusCode: number | undefined;
  message: string;
  data?: unknown;
  meta?: unknown;
};

interface PaginatedResponse {
  items: unknown[];
  meta: unknown;
}

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<SuccessResponse> {
    const request = context
      .switchToHttp()
      .getRequest<{ method: string; url: string }>();
    const res = context.switchToHttp().getResponse<Response>();

    const metadataEntity = this.reflector.get<string>(
      ENTITY_KEY,
      context.getHandler(),
    );
    const metadataMessage = this.reflector.get<string>(
      MESSAGE_KEY,
      context.getHandler(),
    );
    const entity = metadataEntity || this.getEntityName(request.url);

    return next.handle().pipe(
      map((response: unknown) => {
        const isPaginated =
          response &&
          typeof response === 'object' &&
          'items' in response &&
          'meta' in response;

        const data = isPaginated
          ? (response as PaginatedResponse).items
          : response;
        const meta = isPaginated
          ? (response as PaginatedResponse).meta
          : undefined;

        return {
          success: true,
          statusCode: res.statusCode,
          message:
            metadataMessage || this.getMessage(request.method, entity, data),
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
