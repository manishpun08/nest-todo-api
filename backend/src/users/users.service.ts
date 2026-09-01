import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Prisma, type User } from '../../generated/prisma';
import { ErrorMessageUtil } from '../common/error-message.util';
import type { QueryDto } from '../common/query.dto';
import type { CreateUserDto } from './dto/create-user.dto';
import type { UpdateUserDto } from './dto/update-user.dto';
import type { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private repository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await this.repository.create({
        ...userData,
        password: hashedPassword,
      });

      const { password: _p, refreshToken: _rt, ...user } = result;
      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException(ErrorMessageUtil.conflictEntity('Email'));
      }
      throw error;
    }
  }

  async findAll(query?: QueryDto) {
    const result = await this.repository.findAll(query);

    return {
      items: result.items.map((u: User) => {
        const { password: _p, refreshToken: _rt, ...user } = u;
        return user;
      }),
      meta: result.meta,
    };
  }

  async findOne(id: string) {
    const user = await this.repository.findOne(id);

    if (!user) {
      throw new NotFoundException(ErrorMessageUtil.notFound('User'));
    }

    const { password: _p, refreshToken: _rt, ...result } = user;
    return result;
  }

  async findById(id: string): Promise<User | null> {
    return this.repository.findOne(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findByEmail(email);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.repository.update(id, updateUserDto);
      const { password: _p, refreshToken: _rt, ...result } = user;
      return result;
    } catch (error) {
      ErrorMessageUtil.throwNotFoundIfPrismaError(error, 'User');
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.repository.remove(id);
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
    return await this.repository.update(userId, { refreshToken: hashedToken });
  }
}
