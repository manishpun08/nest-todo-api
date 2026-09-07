import { Check, Trash2 } from 'lucide-react-native';
import { Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { Card } from '@/components/ui/Card';
import type { Todo } from '../types';

interface TodoCardProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoCard({ todo, onToggle, onDelete }: TodoCardProps) {
  const isDark = useColorScheme() === 'dark';

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
        {/* Toggle + Content */}
        <TouchableOpacity
          onPress={() => onToggle(todo.id)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            marginRight: 10,
          }}
          activeOpacity={0.7}
        >
          {/* Circular Checkbox */}
          <View
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: todo.isCompleted ? '#10B981' : isDark ? '#64748B' : '#94A3B8',
              backgroundColor: todo.isCompleted ? '#10B981' : 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            }}
          >
            {todo.isCompleted ? <Check size={14} color="#FFFFFF" strokeWidth={3} /> : null}
          </View>

          {/* Title & Description */}
          <View style={{ flex: 1 }}>
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
          </View>
        </TouchableOpacity>

        {/* Delete Action Button */}
        <TouchableOpacity
          onPress={() => onDelete(todo.id)}
          style={{
            padding: 8,
            borderRadius: 10,
            backgroundColor: isDark ? 'rgba(239, 68, 68, 0.15)' : '#FEF2F2',
          }}
          activeOpacity={0.7}
        >
          <Trash2 size={16} color="#EF4444" strokeWidth={2} />
        </TouchableOpacity>
      </View>
    </Card>
  );
}
