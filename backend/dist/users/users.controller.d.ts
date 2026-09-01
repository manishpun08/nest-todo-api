import type { QueryDto } from '../common/query.dto';
import type { CreateUserDto } from './dto/create-user.dto';
import type { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        name: string;
        email: string;
        id: string;
        createdAt: Date;
    }>;
    findAll(query: QueryDto): Promise<{
        items: {
            name: string;
            email: string;
            id: string;
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
        email: string;
        id: string;
        createdAt: Date;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        name: string;
        email: string;
        id: string;
        createdAt: Date;
    }>;
    remove(id: string): Promise<{
        name: string;
        email: string;
        password: string;
        id: string;
        refreshToken: string | null;
        createdAt: Date;
    }>;
}
