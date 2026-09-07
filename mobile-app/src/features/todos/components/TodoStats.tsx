import { CheckCircle2, Circle, ListTodo } from 'lucide-react-native';
import { useColorScheme, View } from 'react-native';
import { Typography } from '@/components/ui/Typography';
import type { Todo } from '../types';

interface TodoStatsProps {
  todos: Todo[];
}

export function TodoStats({ todos }: TodoStatsProps) {
  const isDark = useColorScheme() === 'dark';

  const total = todos.length;
  const completed = todos.filter((t) => t.isCompleted).length;
  const pending = total - completed;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <View style={{ marginBottom: 20 }}>
      {/* 3 Metric Cards */}
      <View style={{ flexDirection: 'row', gap: 10, marginBottom: 12 }}>
        {/* Total */}
        <View
          style={{
            flex: 1,
            backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
            borderRadius: 16,
            padding: 14,
            borderWidth: 1,
            borderColor: isDark ? '#334155' : '#E2E8F0',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
            <ListTodo size={16} color="#3B82F6" strokeWidth={2.2} />
            <Typography
              variant="caption"
              style={{ marginLeft: 6, color: isDark ? '#94A3B8' : '#64748B', fontWeight: '600' }}
            >
              Total
            </Typography>
          </View>
          <Typography
            variant="h2"
            style={{ fontSize: 22, fontWeight: '800', color: isDark ? '#FFFFFF' : '#0F172A' }}
          >
            {total}
          </Typography>
        </View>

        {/* Completed */}
        <View
          style={{
            flex: 1,
            backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
            borderRadius: 16,
            padding: 14,
            borderWidth: 1,
            borderColor: isDark ? '#334155' : '#E2E8F0',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
            <CheckCircle2 size={16} color="#10B981" strokeWidth={2.2} />
            <Typography
              variant="caption"
              style={{ marginLeft: 6, color: isDark ? '#94A3B8' : '#64748B', fontWeight: '600' }}
            >
              Done
            </Typography>
          </View>
          <Typography variant="h2" style={{ fontSize: 22, fontWeight: '800', color: '#10B981' }}>
            {completed}
          </Typography>
        </View>

        {/* Pending */}
        <View
          style={{
            flex: 1,
            backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
            borderRadius: 16,
            padding: 14,
            borderWidth: 1,
            borderColor: isDark ? '#334155' : '#E2E8F0',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
            <Circle size={16} color="#F59E0B" strokeWidth={2.2} />
            <Typography
              variant="caption"
              style={{ marginLeft: 6, color: isDark ? '#94A3B8' : '#64748B', fontWeight: '600' }}
            >
              Pending
            </Typography>
          </View>
          <Typography variant="h2" style={{ fontSize: 22, fontWeight: '800', color: '#F59E0B' }}>
            {pending}
          </Typography>
        </View>
      </View>

      {/* Progress Bar */}
      <View
        style={{
          backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
          borderRadius: 14,
          paddingHorizontal: 14,
          paddingVertical: 10,
          borderWidth: 1,
          borderColor: isDark ? '#334155' : '#E2E8F0',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 6,
          }}
        >
          <Typography
            variant="caption"
            style={{ fontSize: 12, fontWeight: '600', color: isDark ? '#94A3B8' : '#64748B' }}
          >
            Completion Rate
          </Typography>
          <Typography
            variant="caption"
            style={{ fontSize: 12, fontWeight: '700', color: '#3B82F6' }}
          >
            {percent}%
          </Typography>
        </View>

        <View
          style={{
            height: 6,
            backgroundColor: isDark ? '#334155' : '#E2E8F0',
            borderRadius: 9999,
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              height: '100%',
              width: `${percent}%`,
              backgroundColor: '#3B82F6',
              borderRadius: 9999,
            }}
          />
        </View>
      </View>
    </View>
  );
}
