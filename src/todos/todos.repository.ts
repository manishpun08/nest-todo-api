import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Todo, Prisma } from '../../generated/prisma';
import { QueryDto } from '../common/query.dto';
import { buildPrismaQuery } from '../common/query.util';
import { PaginatedResult } from '../common/base.repository';

@Injectable()
export class TodosRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TodoCreateInput): Promise<Todo> {
    return this.prisma.todo.create({ data });
  }

  async findAll(query?: QueryDto): Promise<PaginatedResult<Todo>> {
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

  async findOne(id: string): Promise<Todo | null> {
    return this.prisma.todo.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: Prisma.TodoUpdateInput): Promise<Todo> {
    return this.prisma.todo.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Todo> {
    return this.prisma.todo.delete({
      where: { id },
    });
  }
}
