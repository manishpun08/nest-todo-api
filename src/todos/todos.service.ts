import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '../../generated/prisma';

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

  async findOne(id: number) {
    const todo = await this.prisma.todo.findUnique({
      where: { id },
    });

    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }

    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    try {
      return await this.prisma.todo.update({
        where: { id },
        data: updateTodoDto,
      });
    } catch (error) {
      this.throwNotFoundIfMissingTodo(error, id);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.todo.delete({
        where: { id },
      });
    } catch (error) {
      this.throwNotFoundIfMissingTodo(error, id);
      throw error;
    }
  }

  private throwNotFoundIfMissingTodo(error: unknown, id: number): void {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
  }
}
