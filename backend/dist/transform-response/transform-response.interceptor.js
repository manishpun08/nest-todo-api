"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformResponseInterceptor = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const operators_1 = require("rxjs/operators");
const entity_decorator_1 = require("../common/decorators/entity.decorator");
const message_util_1 = require("../common/message.util");
let TransformResponseInterceptor = class TransformResponseInterceptor {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();
        const metadataEntity = this.reflector.get(entity_decorator_1.ENTITY_KEY, context.getHandler());
        const metadataMessage = this.reflector.get(entity_decorator_1.MESSAGE_KEY, context.getHandler());
        const entity = metadataEntity || this.getEntityName(request.url);
        return next.handle().pipe((0, operators_1.map)((response) => {
            const isPaginated = response && typeof response === 'object' && 'items' in response && 'meta' in response;
            const data = isPaginated ? response.items : response;
            const meta = isPaginated ? response.meta : undefined;
            return {
                success: true,
                statusCode: res.statusCode,
                message: metadataMessage || this.getMessage(request.method, entity, data),
                ...(request.method === 'DELETE' ? {} : { data }),
                ...(meta ? { meta } : {}),
            };
        }));
    }
    getMessage(method, entity, data) {
        if (method === 'POST') {
            return message_util_1.SuccessMessageUtil.created(entity);
        }
        if (method === 'PATCH' || method === 'PUT') {
            return message_util_1.SuccessMessageUtil.updated(entity);
        }
        if (method === 'DELETE') {
            return message_util_1.SuccessMessageUtil.deleted(entity);
        }
        if (method === 'GET' && Array.isArray(data)) {
            return message_util_1.SuccessMessageUtil.listFetched(entity);
        }
        return message_util_1.SuccessMessageUtil.fetched(entity);
    }
    getEntityName(url) {
        const [firstSegment] = url.split('?')[0].split('/').filter(Boolean);
        if (!firstSegment) {
            return 'Resource';
        }
        const singular = firstSegment.endsWith('s') ? firstSegment.slice(0, -1) : firstSegment;
        return singular.charAt(0).toUpperCase() + singular.slice(1);
    }
};
exports.TransformResponseInterceptor = TransformResponseInterceptor;
exports.TransformResponseInterceptor = TransformResponseInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], TransformResponseInterceptor);
//# sourceMappingURL=transform-response.interceptor.js.map