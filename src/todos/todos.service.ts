import { Injectable, NotFoundException } from '@nestjs/common';
import { ErrorMessageUtil } from '../common/error-message.util';
import { QueryDto } from '../common/query.dto';
import { TodosRepository } from './todos.repository';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(private repository: TodosRepository) {}

  create(createTodoDto: CreateTodoDto) {
    return this.repository.create(createTodoDto);
  }

  async findAll(query?: QueryDto) {
    return this.repository.findAll(query);
  }

  async findOne(id: string) {
    const todo = await this.repository.findOne(id);
    if (!todo) {
      throw new NotFoundException(ErrorMessageUtil.notFound('Todo'));
    }
    return todo;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    try {
      return await this.repository.update(id, updateTodoDto);
    } catch (error) {
      ErrorMessageUtil.throwNotFoundIfPrismaError(error, 'Todo');
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.repository.remove(id);
    } catch (error) {
      ErrorMessageUtil.throwNotFoundIfPrismaError(error, 'Todo');
      throw error;
    }
  }
}
