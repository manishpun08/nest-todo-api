import { Reflector } from '@nestjs/core';
import { TransformResponseInterceptor } from './transform-response.interceptor';

describe('TransformResponseInterceptor', () => {
  it('should be defined', () => {
    expect(new TransformResponseInterceptor(new Reflector())).toBeDefined();
  });
});
