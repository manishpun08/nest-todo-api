import { Injectable, NotFoundException } from '@nestjs/common';
import { ErrorMessageUtil } from '../common/error-message.util';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  create(createTodoDto: CreateTodoDto) {
    return this.prisma.todo.create({
      data: createTodoDto,
    });
  }

  async findAll() {
    return await this.prisma.todo.findMany();
  }

  async findOne(id: string) {
    const todo = await this.prisma.todo.findUnique({
      where: { id },
    });

    if (!todo) {
      throw new NotFoundException(ErrorMessageUtil.notFound('Todo'));
    }

    return todo;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    try {
      return await this.prisma.todo.update({
        where: { id },
        data: updateTodoDto,
      });
    } catch (error) {
      ErrorMessageUtil.throwNotFoundIfPrismaError(error, 'Todo');
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.todo.delete({
        where: { id },
      });
    } catch (error) {
      ErrorMessageUtil.throwNotFoundIfPrismaError(error, 'Todo');
      throw error;
    }
  }
}
