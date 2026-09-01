export const QUERY_KEYS = {
  AUTH_USER: ['auth', 'user'] as const,
  TODOS_LIST: ['todos', 'list'] as const,
  TODO_DETAIL: (id: string) => ['todos', 'detail', id] as const,
} as const;
