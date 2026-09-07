import type { QueryDto } from '../common/query.dto';
import type { CreateTodoDto } from './dto/create-todo.dto';
import type { UpdateTodoDto } from './dto/update-todo.dto';
import { TodosRepository } from './todos.repository';
export declare class TodosService {
    private repository;
    constructor(repository: TodosRepository);
    create(createTodoDto: CreateTodoDto): Promise<{
        title: string;
        description: string | null;
        completed: boolean;
        id: string;
        createdAt: Date;
    }>;
    findAll(query?: QueryDto): Promise<import("../common/base.repository").PaginatedResult<{
        title: string;
        description: string | null;
        completed: boolean;
        id: string;
        createdAt: Date;
    }>>;
    findOne(id: string): Promise<{
        title: string;
        description: string | null;
        completed: boolean;
        id: string;
        createdAt: Date;
    }>;
    update(id: string, updateTodoDto: UpdateTodoDto): Promise<{
        title: string;
        description: string | null;
        completed: boolean;
        id: string;
        createdAt: Date;
    }>;
    remove(id: string): Promise<{
        title: string;
        description: string | null;
        completed: boolean;
        id: string;
        createdAt: Date;
    }>;
}
