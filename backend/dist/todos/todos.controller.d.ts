import { QueryDto } from '../common/query.dto';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodosService } from './todos.service';
export declare class TodosController {
    private readonly todosService;
    constructor(todosService: TodosService);
    create(createTodoDto: CreateTodoDto): Promise<{
        title: string;
        description: string | null;
        completed: boolean;
        id: string;
        createdAt: Date;
    }>;
    findAll(query: QueryDto): Promise<import("../common/base.repository").PaginatedResult<{
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
