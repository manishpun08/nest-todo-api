export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me',
  },
  TODOS: {
    BASE: '/todos',
    BY_ID: (id: string) => `/todos/${id}`,
    TOGGLE: (id: string) => `/todos/${id}/toggle`,
  },
} as const;
