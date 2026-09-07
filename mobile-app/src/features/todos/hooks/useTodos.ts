import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/query-keys';
import { todoService } from '../services/todo.service';
import type { CreateTodoInput } from '../types';

export function useTodos() {
  const queryClient = useQueryClient();

  const todosQuery = useQuery({
    queryKey: QUERY_KEYS.TODOS_LIST,
    queryFn: todoService.getTodos,
  });

  const createMutation = useMutation({
    mutationFn: (input: CreateTodoInput) => todoService.createTodo(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TODOS_LIST });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: (id: string) => {
      const todo = (todosQuery.data ?? []).find((t) => t.id === id);
      const isCompleted = todo ? !todo.isCompleted : true;
      return todoService.toggleTodo(id, isCompleted);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TODOS_LIST });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => todoService.deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TODOS_LIST });
    },
  });

  return {
    todos: todosQuery.data ?? [],
    isLoading: todosQuery.isLoading,
    isError: todosQuery.isError,
    error: todosQuery.error instanceof Error ? todosQuery.error.message : null,
    refetch: todosQuery.refetch,
    createTodo: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    toggleTodo: toggleMutation.mutateAsync,
    deleteTodo: deleteMutation.mutateAsync,
  };
}
