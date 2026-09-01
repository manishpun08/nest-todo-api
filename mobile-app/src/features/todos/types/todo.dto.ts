export interface TodoDTO {
  id: string;
  title: string;
  description?: string | null;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface CreateTodoDTO {
  title: string;
  description?: string;
}

export interface UpdateTodoDTO {
  title?: string;
  description?: string;
  is_completed?: boolean;
}
