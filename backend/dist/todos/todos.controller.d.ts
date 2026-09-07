import { QueryDto } from '../common/query.dto';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodosService } from './todos.service';
export declare class TodosController {
    private readonly todosService;
    constructor(todosService: TodosService);
    create(createTodoDto: CreateTodoDto): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        description: string | null;
        completed: boolean;
    }>;
    findAll(query: QueryDto): Promise<import("../common/base.repository").PaginatedResult<{
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
