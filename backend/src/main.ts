import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { TransformResponseInterceptor } from './transform-response/transform-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for web and mobile clients
  app.enableCors({
    origin: true,
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new TransformResponseInterceptor(reflector));
  app.useGlobalFilters(new HttpExceptionFilter());
  const port = process.env.PORT ?? 3000;
  await app.listen(port, '0.0.0.0');
}

bootstrap();
