import type { Todo, TodoDTO } from '../types';

export const mapTodoDTO = (
  dto: TodoDTO | (Record<string, unknown> & { id: string; title: string }),
): Todo => {
  const record = dto as Record<string, unknown>;
  return {
    id: String(record.id ?? ''),
    title: String(record.title ?? ''),
    description: typeof record.description === 'string' ? record.description : undefined,
    isCompleted: Boolean(record.completed ?? record.is_completed ?? false),
    createdAt: record.createdAt
      ? new Date(record.createdAt as string)
      : record.created_at
        ? new Date(record.created_at as string)
        : new Date(),
    updatedAt: record.updatedAt
      ? new Date(record.updatedAt as string)
      : record.updated_at
        ? new Date(record.updated_at as string)
        : new Date(),
    userId: String(record.userId ?? record.user_id ?? ''),
  };
};

export const mapTodosDTO = (dtos: TodoDTO[]): Todo[] =>
  Array.isArray(dtos) ? dtos.map(mapTodoDTO) : [];
