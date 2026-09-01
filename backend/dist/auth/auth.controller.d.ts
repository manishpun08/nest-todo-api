import type { User } from '../../generated/prisma';
import { AuthService } from './auth.service';
import type { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        name: string;
        email: string;
        id: string;
        createdAt: Date;
    }>;
    login(req: {
        user: User;
    }): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    logout(req: {
        user: {
            userId: string;
        };
    }): Promise<void>;
    refreshTokens(req: {
        user: {
            sub: string;
            refreshToken: string;
        };
    }): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
