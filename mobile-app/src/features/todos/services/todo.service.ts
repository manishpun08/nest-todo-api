import { API_ENDPOINTS } from '@/constants/endpoints';
import { apiClient } from '@/core/api/client';
import { mapTodoDTO, mapTodosDTO } from '../mappers/todo.mapper';
import type { CreateTodoInput, Todo, TodoDTO, UpdateTodoInput } from '../types';

export const todoService = {
  getTodos: async (): Promise<Todo[]> => {
    const response = await apiClient.get<TodoDTO[]>(API_ENDPOINTS.TODOS.BASE);
    return mapTodosDTO(response.data);
  },

  getTodoById: async (id: string): Promise<Todo> => {
    const response = await apiClient.get<TodoDTO>(API_ENDPOINTS.TODOS.BY_ID(id));
    return mapTodoDTO(response.data);
  },

  createTodo: async (input: CreateTodoInput): Promise<Todo> => {
    const response = await apiClient.post<TodoDTO>(API_ENDPOINTS.TODOS.BASE, {
      title: input.title,
      description: input.description,
    });
    return mapTodoDTO(response.data);
  },

  updateTodo: async (id: string, input: UpdateTodoInput): Promise<Todo> => {
    const response = await apiClient.patch<TodoDTO>(API_ENDPOINTS.TODOS.BY_ID(id), {
      title: input.title,
      description: input.description,
      completed: input.isCompleted,
    });
    return mapTodoDTO(response.data);
  },

  toggleTodo: async (id: string, isCompleted: boolean): Promise<Todo> => {
    const response = await apiClient.patch<TodoDTO>(API_ENDPOINTS.TODOS.BY_ID(id), {
      completed: isCompleted,
    });
    return mapTodoDTO(response.data);
  },

  deleteTodo: async (id: string): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.TODOS.BY_ID(id));
  },
};
