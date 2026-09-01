import { type User } from '../../generated/prisma';
import type { QueryDto } from '../common/query.dto';
import type { CreateUserDto } from './dto/create-user.dto';
import type { UpdateUserDto } from './dto/update-user.dto';
import type { UsersRepository } from './users.repository';
export declare class UsersService {
    private repository;
    constructor(repository: UsersRepository);
    create(createUserDto: CreateUserDto): Promise<{
        name: string;
        id: string;
        email: string;
        createdAt: Date;
    }>;
    findAll(query?: QueryDto): Promise<{
        items: {
            name: string;
            id: string;
            email: string;
            createdAt: Date;
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        name: string;
        id: string;
        email: string;
        createdAt: Date;
    }>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        name: string;
        id: string;
        email: string;
        createdAt: Date;
    }>;
    remove(id: string): Promise<{
        name: string;
        id: string;
        email: string;
        password: string;
        refreshToken: string | null;
        createdAt: Date;
    }>;
    updateRefreshToken(userId: string, refreshToken: string | null): Promise<{
        name: string;
        id: string;
        email: string;
        password: string;
        refreshToken: string | null;
        createdAt: Date;
    }>;
}
