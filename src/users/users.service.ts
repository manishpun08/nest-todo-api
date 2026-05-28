import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma, User } from '../../generated/prisma';
import { ErrorMessageUtil } from '../common/error-message.util';
import { QueryDto } from '../common/query.dto';
import { buildPrismaQuery } from '../common/query.util';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await this.prisma.user.create({
        data: {
          ...userData,
          password: hashedPassword,
        },
      });

      const { password: _p, refreshToken: _rt, ...user } = result;
      return user;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(ErrorMessageUtil.conflictEntity('Email'));
      }
      throw error;
    }
  }

  async findAll(query?: QueryDto) {
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
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
        },
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

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(ErrorMessageUtil.notFound('User'));
    }

    const { password: _p, refreshToken: _rt, ...result } = user;
    return result;
  }

  async findById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
      const { password: _p, refreshToken: _rt, ...result } = user;
      return result;
    } catch (error) {
      ErrorMessageUtil.throwNotFoundIfPrismaError(error, 'User');
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      ErrorMessageUtil.throwNotFoundIfPrismaError(error, 'User');
      throw error;
    }
  }

  async updateRefreshToken(userId: string, refreshToken: string | null) {
    let hashedToken: string | null = null;
    if (refreshToken) {
      hashedToken = await bcrypt.hash(refreshToken, 10);
    }
    return await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: hashedToken },
    });
  }
}
