import { Award, CheckCircle2, Clock, Flame, Target, TrendingUp } from 'lucide-react-native';
import { useMemo } from 'react';
import { ScrollView, Text, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import { useTodos } from '@/features/todos/hooks/useTodos';

export default function AnalyticsScreen() {
  const isDark = useColorScheme() === 'dark';
  const { todos } = useTodos();

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((t) => t.isCompleted).length;
    const pending = total - completed;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, pending, rate };
  }, [todos]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDark ? '#090D16' : '#F8FAFC',
      }}
    >
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Screen Header */}
        <View style={{ marginBottom: 20 }}>
          <Text
            style={{
              fontSize: 13,
              fontWeight: '600',
              color: isDark ? '#94A3B8' : '#64748B',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              marginBottom: 2,
            }}
          >
            Insights & Trends
          </Text>
          <Typography
            variant="h1"
            style={{
              fontSize: 26,
              fontWeight: '800',
              color: isDark ? '#FFFFFF' : '#0F172A',
            }}
          >
            Productivity Analytics
          </Typography>
        </View>

        {/* Hero Completion Score Card */}
        <Card
          style={{
            padding: 22,
            marginBottom: 16,
            backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
            borderWidth: 1,
            borderColor: isDark ? '#334155' : '#E2E8F0',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: isDark ? '#94A3B8' : '#64748B',
                }}
              >
                Overall Progress
              </Text>
              <Text
                style={{
                  fontSize: 36,
                  fontWeight: '800',
                  color: stats.rate >= 80 ? '#10B981' : stats.rate >= 40 ? '#3B82F6' : '#F59E0B',
                  marginTop: 2,
                }}
              >
                {stats.rate}%
              </Text>
            </View>

            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: isDark ? 'rgba(59, 130, 246, 0.15)' : '#EFF6FF',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TrendingUp size={28} color="#3B82F6" strokeWidth={2.4} />
            </View>
          </View>

          {/* Progress Bar */}
          <View
            style={{
              width: '100%',
              height: 10,
              borderRadius: 5,
              backgroundColor: isDark ? '#334155' : '#E2E8F0',
              overflow: 'hidden',
              marginBottom: 12,
            }}
          >
            <View
              style={{
                width: `${stats.rate}%`,
                height: '100%',
                borderRadius: 5,
                backgroundColor:
                  stats.rate >= 80 ? '#10B981' : stats.rate >= 40 ? '#3B82F6' : '#F59E0B',
              }}
            />
          </View>

          <Text
            style={{
              fontSize: 13,
              color: isDark ? '#94A3B8' : '#64748B',
              fontWeight: '500',
            }}
          >
            {stats.rate === 100 && stats.total > 0
              ? '🎉 Outstanding! All your tasks are completed.'
              : stats.rate > 50
                ? '⚡ Great momentum! You are over halfway through.'
                : '🚀 Keep going! Check off items to raise your score.'}
          </Text>
        </Card>

        {/* 2x2 Metric Grid */}
        <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
          {/* Completed Metric */}
          <Card style={{ flex: 1, padding: 18 }}>
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                backgroundColor: isDark ? 'rgba(16, 185, 129, 0.15)' : '#ECFDF5',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 10,
              }}
            >
              <CheckCircle2 size={20} color="#10B981" strokeWidth={2.4} />
            </View>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '800',
                color: isDark ? '#FFFFFF' : '#0F172A',
              }}
            >
              {stats.completed}
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: '500',
                color: isDark ? '#94A3B8' : '#64748B',
                marginTop: 2,
              }}
            >
              Completed
            </Text>
          </Card>

          {/* Pending Metric */}
          <Card style={{ flex: 1, padding: 18 }}>
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                backgroundColor: isDark ? 'rgba(245, 158, 11, 0.15)' : '#FFFBEB',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 10,
              }}
            >
              <Clock size={20} color="#F59E0B" strokeWidth={2.4} />
            </View>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '800',
                color: isDark ? '#FFFFFF' : '#0F172A',
              }}
            >
              {stats.pending}
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: '500',
                color: isDark ? '#94A3B8' : '#64748B',
                marginTop: 2,
              }}
            >
              In Progress
            </Text>
          </Card>
        </View>

        {/* Productivity Highlights Card */}
        <Card style={{ padding: 20, marginBottom: 16 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 14,
            }}
          >
            <Flame size={20} color="#EF4444" style={{ marginRight: 8 }} />
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: isDark ? '#FFFFFF' : '#0F172A',
              }}
            >
              Productivity Highlights
            </Text>
          </View>

          <View style={{ gap: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Award size={18} color="#F59E0B" style={{ marginRight: 10 }} />
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: isDark ? '#FFFFFF' : '#0F172A',
                  }}
                >
                  {stats.total >= 5 ? 'Power Planner' : 'Getting Started'}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: isDark ? '#94A3B8' : '#64748B',
                  }}
                >
                  {stats.total} total task{stats.total === 1 ? '' : 's'} registered in your workflow
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Target size={18} color="#3B82F6" style={{ marginRight: 10 }} />
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: isDark ? '#FFFFFF' : '#0F172A',
                  }}
                >
                  Daily Focus Goal
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: isDark ? '#94A3B8' : '#64748B',
                  }}
                >
                  {stats.completed >= 3
                    ? 'Target achieved for today!'
                    : `Complete ${Math.max(0, 3 - stats.completed)} more to hit daily goal`}
                </Text>
              </View>
            </View>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
