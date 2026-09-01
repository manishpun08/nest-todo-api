# NestJS Backend — AI Agent Guidelines & Architecture Rules

You are an expert NestJS and Distributed Systems Backend Engineer. Strictly follow the architectural patterns, directory structures, and conventions documented below.

---

## 1. Core Architecture: Modular Hexagonal Architecture

Every business feature belongs in `src/modules/[module-name]/` and is organized into three distinct layers: **API**, **Core (Domain & Application)**, and **Infrastructure**.

```
src/modules/[module-name]/
├── api/                                # Presentation / Delivery Layer
│   ├── dtos/                           # Request & response DTOs
│   │   ├── create-[feature].dto.ts
│   │   ├── [feature]-query.dto.ts
│   │   └── index.ts
│   ├── decorators/                     # Custom route decorators
│   ├── guards/                         # Route-specific guards (RBAC, ownership)
│   ├── [feature].controller.ts         # HTTP controller (lightweight routing/dispatch)
│   ├── [feature].swagger.ts            # Swagger / OpenAPI documentation decorators
│   └── __tests__/                      # API / Controller unit tests
├── core/                               # Domain & Application Logic (Clean & Decoupled)
│   ├── ports/                          # Dependency inversion interfaces / injection tokens
│   │   ├── [feature].repository.interface.ts
│   │   └── [feature].service.interface.ts
│   ├── services/                       # Core domain business logic & use cases
│   │   └── [feature].service.ts
│   ├── types/                          # Domain types & inputs (e.g. CreateFeatureInput)
│   ├── errors/                         # Domain-specific exceptions
│   └── events/                         # Domain event contracts
├── infrastructure/                     # Outbound Adapters & Framework Details
│   ├── persistence/                    # Database repositories (Prisma / SQL)
│   │   └── [feature].prisma.repository.ts
│   ├── queues/                         # BullMQ producers, workers, job constants
│   │   ├── [feature]-queue.constants.ts
│   │   └── [feature].processor.ts
│   └── services/                       # 3rd-party API client implementations
├── [module-name].module.ts             # NestJS Module configuration & DI bindings
└── index.ts                            # Module public export barrel
```

### Shared Layers:
- `src/common/`: Cross-cutting concerns (Interceptors, Filters, Global Guards, Decorators, Middleware, RequestContext, DatabaseModule, Logger).
- `src/shared-kernel/`: Shared domain primitives, value objects, and utility types used across modules.

---

## 2. Layer Rules & Dependency Flow

```
API (Controller + DTO) ───> CORE (Services + Ports) <─── INFRASTRUCTURE (Prisma / Queues)
```

1. **API Layer**:
   - Controllers **must** only parse input, call Core Services, and return raw data or standard responses.
   - Never write database/Prisma queries inside Controllers.
   - Extract OpenAPI `@ApiOperation`, `@ApiResponse`, and `@ApiQuery` decorators into dedicated `[feature].swagger.ts` helper files to keep controllers clean.
   - Use route versioning (e.g. `@Controller({ path: 'features', version: '1' })`).

2. **Core Layer**:
   - Contains pure business rules, validations, and domain orchestrations.
   - Accesses persistence or external services strictly through **Ports** (`[feature].repository.interface.ts`).
   - Uses `Symbol` or `string` injection tokens (e.g. `export const FEATURE_REPOSITORY = Symbol('FEATURE_REPOSITORY')`).

3. **Infrastructure Layer**:
   - Implements ports (e.g., `PrismaFeatureRepository implements FeatureRepositoryPort`).
   - Handles Prisma transactions, DB mapping, caching (Redis), queues (BullMQ), and external SDKs.

4. **Dependency Injection in `[feature].module.ts`**:
   ```ts
   @Module({
     imports: [PrismaModule, BullModule.registerQueue({ name: FEATURE_QUEUE })],
     controllers: [FeatureController],
     providers: [
       FeatureService,
       {
         provide: FEATURE_REPOSITORY,
         useClass: PrismaFeatureRepository,
       },
     ],
     exports: [FeatureService],
   })
   export class FeatureModule {}
   ```

---

## 3. Standard API Response Envelope

Every endpoint is wrapped into a unified envelope via `TransformInterceptor`:

### Success Response Contract:
```json
{
  "success": true,
  "status": 200,
  "message": "Operation completed successfully",
  "data": { ... },
  "meta": {
    "timestamp": "2026-09-01T10:00:00.000Z",
    "correlationId": "req_xyz123",
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5
    }
  }
}
```

### Error Response Contract:
```json
{
  "success": false,
  "status": 400,
  "message": "Validation failed",
  "error": {
    "code": "BAD_REQUEST",
    "details": ["email must be an email"]
  },
  "meta": {
    "timestamp": "2026-09-01T10:00:00.000Z",
    "correlationId": "req_xyz123"
  }
}
```

---

## 4. Coding & Tooling Standards

- **Language & Module System**: TypeScript with strict mode, `NodeNext` resolution.
- **Path Aliases**:
  - `@common/*` -> `src/common/*`
  - `@modules/*` -> `src/modules/*`
  - `@shared-kernel/*` -> `src/shared-kernel/*`
- **Validation**: Use `class-validator` and `class-transformer` for all DTOs.
- **Linter & Formatter**: Biome (`biome check .` / `biome format --write .`).
- **Logging**: Structured JSON logging via `pino` / `nestjs-pino` with correlation ID propagation.
- **Authentication**: JWT cookies / Bearer tokens with `@RequireAuthenticated()` and `@CurrentUser()` decorators.
