import type { Prisma, Todo } from '../../generated/prisma';
import type { PaginatedResult } from '../common/base.repository';
import type { QueryDto } from '../common/query.dto';
import type { PrismaService } from '../prisma/prisma.service';
export declare class TodosRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.TodoCreateInput): Promise<Todo>;
    findAll(query?: QueryDto): Promise<PaginatedResult<Todo>>;
    findOne(id: string): Promise<Todo | null>;
    update(id: string, data: Prisma.TodoUpdateInput): Promise<Todo>;
    remove(id: string): Promise<Todo>;
}
