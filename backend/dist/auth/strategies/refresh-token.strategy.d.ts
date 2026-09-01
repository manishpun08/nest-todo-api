import type { ConfigService } from '@nestjs/config';
import type { Request } from 'express';
import { Strategy } from 'passport-jwt';
interface JwtPayload {
    sub: string;
    email: string;
}
declare const RefreshTokenStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class RefreshTokenStrategy extends RefreshTokenStrategy_base {
    constructor(configService: ConfigService);
    validate(req: Request, payload: JwtPayload): {
        refreshToken: string;
        sub: string;
        email: string;
    };
}
export {};
