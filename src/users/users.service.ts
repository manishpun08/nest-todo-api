import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '../../generated/prisma';
import { ErrorMessageUtil } from '../common/error-message.util';
import { QueryDto } from '../common/query.dto';
import { buildPrismaQuery } from '../common/query.util';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.prisma.user.create({
        data: createUserDto,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        // Unique constraint failed
        throw new ConflictException(ErrorMessageUtil.conflictEntity('Email'));
      }

      throw error;
    }
  }

  async findAll(query?: QueryDto) {
    const { where, orderBy } = buildPrismaQuery(query, ['name', 'email']);
    return await this.prisma.user.findMany({ where, orderBy } as any);
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(ErrorMessageUtil.notFound('User'));
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
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
}
