import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { User } from '../../generated/prisma';
import { UsersService } from '../users/users.service';
import type { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    private configService;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService);
    validateUser(email: string, pass: string): Promise<Omit<User, 'password' | 'refreshToken'> | null>;
    login(user: User): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    logout(userId: string): Promise<void>;
    refreshTokens(userId: string, refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    getTokens(userId: string, email: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    register(dto: RegisterDto): Promise<{
        name: string;
        email: string;
        id: string;
        createdAt: Date;
    }>;
}
