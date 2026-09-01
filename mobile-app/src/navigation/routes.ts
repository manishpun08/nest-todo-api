export const ROUTES = {
  HOME: '/',
  EXPLORE: '/explore',
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
  },
  TODOS: {
    LIST: '/todos',
    DETAIL: (id: string) => `/todos/${id}` as const,
    CREATE: '/todos/create',
  },
} as const;
