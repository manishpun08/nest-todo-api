import type { QueryDto } from '../common/query.dto';
import type { CreateTodoDto } from './dto/create-todo.dto';
import type { UpdateTodoDto } from './dto/update-todo.dto';
import type { TodosRepository } from './todos.repository';
export declare class TodosService {
    private repository;
    constructor(repository: TodosRepository);
    create(createTodoDto: CreateTodoDto): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        description: string | null;
        completed: boolean;
    }>;
    findAll(query?: QueryDto): Promise<import("../common/base.repository").PaginatedResult<{
        id: string;
        createdAt: Date;
        title: string;
        description: string | null;
        completed: boolean;
    }>>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        description: string | null;
        completed: boolean;
    }>;
    update(id: string, updateTodoDto: UpdateTodoDto): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        description: string | null;
        completed: boolean;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        description: string | null;
        completed: boolean;
    }>;
}
