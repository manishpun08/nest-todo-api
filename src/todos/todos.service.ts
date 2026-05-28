import { Injectable, NotFoundException } from '@nestjs/common';
import { ErrorMessageUtil } from '../common/error-message.util';
import { QueryDto } from '../common/query.dto';
import { buildPrismaQuery } from '../common/query.util';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  create(createTodoDto: CreateTodoDto) {
    return this.prisma.todo.create({
      data: createTodoDto,
    });
  }

  async findAll(query?: QueryDto) {
    const { where, orderBy, skip, take, page, limit } = buildPrismaQuery(
      query,
      ['title', 'description'],
    );

    const [items, total] = await Promise.all([
      this.prisma.todo.findMany({
        where,
        orderBy,
        skip,
        take,
      }),
      this.prisma.todo.count({ where }),
    ]);

    return {
      items,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
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
      if (error instanceof Error) throw error;
      throw new Error(String(error));
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.todo.delete({
        where: { id },
      });
    } catch (error) {
      ErrorMessageUtil.throwNotFoundIfPrismaError(error, 'Todo');
      if (error instanceof Error) throw error;
      throw new Error(String(error));
    }
  }
}
