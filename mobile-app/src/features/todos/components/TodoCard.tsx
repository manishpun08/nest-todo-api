import { TouchableOpacity, View } from 'react-native';
import { Card } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import type { Todo } from '../types';

interface TodoCardProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoCard({ todo, onToggle, onDelete }: TodoCardProps) {
  return (
    <Card className="mb-3">
      <View className="flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() => onToggle(todo.id)}
          className="flex-row items-center flex-1 mr-2"
          activeOpacity={0.7}
        >
          <View
            className={`w-6 h-6 rounded-full border items-center justify-center mr-3 ${
              todo.isCompleted ? 'bg-blue-600 border-blue-600' : 'border-slate-400 bg-transparent'
            }`}
          >
            {todo.isCompleted && (
              <Typography className="text-white text-xs font-bold">✓</Typography>
            )}
          </View>
          <View className="flex-1">
            <Typography
              variant="body"
              className={`font-semibold ${
                todo.isCompleted ? 'line-through text-slate-400 dark:text-slate-500' : ''
              }`}
            >
              {todo.title}
            </Typography>
            {todo.description ? (
              <Typography variant="caption" className="mt-0.5" numberOfLines={2}>
                {todo.description}
              </Typography>
            ) : null}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onDelete(todo.id)}
          className="p-2 rounded-lg bg-red-50 dark:bg-red-950/30"
          activeOpacity={0.7}
        >
          <Typography className="text-red-600 text-xs font-medium">Delete</Typography>
        </TouchableOpacity>
      </View>
    </Card>
  );
}
