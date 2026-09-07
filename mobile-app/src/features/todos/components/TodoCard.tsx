import { Check, Edit2, Trash2 } from 'lucide-react-native';
import { Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { Card } from '@/components/ui/Card';
import type { Todo } from '../types';

interface TodoCardProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit?: (todo: Todo) => void;
}

export function TodoCard({ todo, onToggle, onDelete, onEdit }: TodoCardProps) {
  const isDark = useColorScheme() === 'dark';

  const formattedTime = todo.createdAt
    ? new Date(todo.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : null;

  return (
    <Card
      style={{
        marginBottom: 10,
        padding: 14,
        borderLeftWidth: 4,
        borderLeftColor: todo.isCompleted ? '#10B981' : '#3B82F6',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Toggle Checkbox */}
        <TouchableOpacity
          onPress={() => onToggle(todo.id)}
          style={{
            width: 26,
            height: 26,
            borderRadius: 13,
            borderWidth: 2,
            borderColor: todo.isCompleted ? '#10B981' : isDark ? '#64748B' : '#94A3B8',
            backgroundColor: todo.isCompleted ? '#10B981' : 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12,
          }}
          activeOpacity={0.7}
        >
          {todo.isCompleted ? <Check size={14} color="#FFFFFF" strokeWidth={3} /> : null}
        </TouchableOpacity>

        {/* Content Body (Tap to edit if onEdit provided) */}
        <TouchableOpacity
          onPress={() => onEdit?.(todo)}
          style={{ flex: 1, marginRight: 8 }}
          activeOpacity={onEdit ? 0.7 : 1}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: '600',
              color: todo.isCompleted
                ? isDark
                  ? '#64748B'
                  : '#94A3B8'
                : isDark
                  ? '#FFFFFF'
                  : '#0F172A',
              textDecorationLine: todo.isCompleted ? 'line-through' : 'none',
            }}
          >
            {todo.title}
          </Text>

          {todo.description ? (
            <Text
              style={{
                fontSize: 13,
                color: isDark ? '#94A3B8' : '#64748B',
                marginTop: 2,
              }}
              numberOfLines={2}
            >
              {todo.description}
            </Text>
          ) : null}

          {formattedTime ? (
            <Text
              style={{
                fontSize: 11,
                color: isDark ? '#64748B' : '#94A3B8',
                marginTop: 4,
                fontWeight: '500',
              }}
            >
              {formattedTime}
            </Text>
          ) : null}
        </TouchableOpacity>

        {/* Action Buttons */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          {onEdit ? (
            <TouchableOpacity
              onPress={() => onEdit(todo)}
              style={{
                padding: 8,
                borderRadius: 10,
                backgroundColor: isDark ? 'rgba(59, 130, 246, 0.12)' : '#EFF6FF',
              }}
              activeOpacity={0.7}
            >
              <Edit2 size={15} color="#3B82F6" strokeWidth={2.2} />
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity
            onPress={() => onDelete(todo.id)}
            style={{
              padding: 8,
              borderRadius: 10,
              backgroundColor: isDark ? 'rgba(239, 68, 68, 0.12)' : '#FEF2F2',
            }}
            activeOpacity={0.7}
          >
            <Trash2 size={15} color="#EF4444" strokeWidth={2.2} />
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
}
