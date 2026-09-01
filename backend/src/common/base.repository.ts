import type { QueryDto } from './query.dto';

export interface PaginatedResult<T> {
  items: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export abstract class BaseRepository<T, CreateDto, UpdateDto> {
  abstract create(data: CreateDto): Promise<T>;
  abstract findAll(query?: QueryDto): Promise<PaginatedResult<T>>;
  abstract findOne(id: string): Promise<T | null>;
  abstract update(id: string, data: UpdateDto): Promise<T>;
  abstract remove(id: string): Promise<T>;
}
