import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '../../generated/prisma';
import { QueryDto } from '../common/query.dto';
import { buildPrismaQuery } from '../common/query.util';
import { PaginatedResult } from '../common/base.repository';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async findAll(query?: QueryDto): Promise<PaginatedResult<User>> {
    const { where, orderBy, skip, take, page, limit } = buildPrismaQuery(
      query,
      ['name', 'email'],
    );

    const [items, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        orderBy,
        skip,
        take,
      }),
      this.prisma.user.count({ where }),
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

  async findOne(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
