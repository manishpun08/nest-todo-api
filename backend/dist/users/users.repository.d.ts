import type { Prisma, User } from '../../generated/prisma';
import type { PaginatedResult } from '../common/base.repository';
import type { QueryDto } from '../common/query.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class UsersRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.UserCreateInput): Promise<User>;
    findAll(query?: QueryDto): Promise<PaginatedResult<User>>;
    findOne(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    update(id: string, data: Prisma.UserUpdateInput): Promise<User>;
    remove(id: string): Promise<User>;
}
