import type { Todo, TodoDTO } from '../types';

export const mapTodoDTO = (dto: TodoDTO): Todo => ({
  id: dto.id,
  title: dto.title,
  description: dto.description ?? undefined,
  isCompleted: dto.is_completed,
  createdAt: new Date(dto.created_at),
  updatedAt: new Date(dto.updated_at),
  userId: dto.user_id,
});

export const mapTodosDTO = (dtos: TodoDTO[]): Todo[] => dtos.map(mapTodoDTO);
