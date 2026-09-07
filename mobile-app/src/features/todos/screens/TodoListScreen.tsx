import { CheckCircle2, LogOut, Plus, Sparkles } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Typography } from '@/components/ui/Typography';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { TodoCard } from '../components/TodoCard';
import { type FilterStatus, TodoFilters } from '../components/TodoFilters';
import { TodoStats } from '../components/TodoStats';
import { useTodos } from '../hooks/useTodos';

export function TodoListScreen() {
  const isDark = useColorScheme() === 'dark';
  const { user, logout } = useAuth();
  const { todos, isLoading, isCreating, createTodo, toggleTodo, deleteTodo } = useTodos();

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCreate = async () => {
    if (!newTitle.trim()) return;
    await createTodo({
      title: newTitle.trim(),
      description: newDescription.trim() || undefined,
    });
    setNewTitle('');
    setNewDescription('');
  };

  // Filtered & Searched Tasks
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      // Filter status
      if (filter === 'active' && todo.isCompleted) return false;
      if (filter === 'completed' && !todo.isCompleted) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = todo.title.toLowerCase().includes(query);
        const matchesDesc = todo.description?.toLowerCase().includes(query) ?? false;
        return matchesTitle || matchesDesc;
      }

      return true;
    });
  }, [todos, filter, searchQuery]);

  const todayString = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDark ? '#090D16' : '#F8FAFC',
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <FlatList
          data={filteredTodos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TodoCard
              todo={item}
              onToggle={(id) => toggleTodo(id)}
              onDelete={(id) => deleteTodo(id)}
            />
          )}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: 40,
          }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={{ paddingTop: 8, paddingBottom: 12 }}>
              {/* Header Profile & Date */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 20,
                }}
              >
                <View>
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
                    {todayString}
                  </Text>
                  <Typography
                    variant="h1"
                    style={{
                      fontSize: 26,
                      fontWeight: '800',
                      color: isDark ? '#FFFFFF' : '#0F172A',
                    }}
                  >
                    {user?.name ? `Hello, ${user.name}` : 'My Tasks'}
                  </Typography>
                </View>

                {user ? (
                  <TouchableOpacity
                    onPress={logout}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 12,
                      backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
                      borderWidth: 1,
                      borderColor: isDark ? '#334155' : '#E2E8F0',
                    }}
                    activeOpacity={0.7}
                  >
                    <LogOut size={16} color="#EF4444" style={{ marginRight: 6 }} />
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: '600',
                        color: isDark ? '#E2E8F0' : '#475569',
                      }}
                    >
                      Sign Out
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>

              {/* Stats Summary Component */}
              <TodoStats todos={todos} />

              {/* Create Task Card */}
              <Card style={{ marginBottom: 20, padding: 18 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 12,
                  }}
                >
                  <Sparkles size={18} color="#3B82F6" style={{ marginRight: 6 }} />
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '700',
                      color: isDark ? '#FFFFFF' : '#0F172A',
                    }}
                  >
                    Create New Task
                  </Text>
                </View>

                <Input
                  placeholder="What needs to be done?"
                  value={newTitle}
                  onChangeText={setNewTitle}
                />
                <Input
                  placeholder="Details / notes (optional)"
                  value={newDescription}
                  onChangeText={setNewDescription}
                />
                <Button
                  label="Add Task"
                  icon={<Plus size={18} color="#FFFFFF" strokeWidth={2.5} />}
                  onPress={handleCreate}
                  isLoading={isCreating}
                  disabled={!newTitle.trim()}
                  style={{ marginTop: 2 }}
                />
              </Card>

              {/* Filters & Search */}
              <TodoFilters
                filter={filter}
                onFilterChange={setFilter}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </View>
          }
          ListEmptyComponent={
            isLoading ? (
              <View style={{ paddingVertical: 40, alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#3B82F6" />
              </View>
            ) : (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 48,
                  paddingHorizontal: 20,
                  backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: isDark ? '#334155' : '#E2E8F0',
                  borderStyle: 'dashed',
                }}
              >
                <View
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 28,
                    backgroundColor: isDark ? 'rgba(59, 130, 246, 0.15)' : '#EFF6FF',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 12,
                  }}
                >
                  <CheckCircle2 size={28} color="#3B82F6" />
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginBottom: 4,
                  }}
                >
                  {searchQuery || filter !== 'all' ? 'No matching tasks' : 'No tasks yet'}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: isDark ? '#94A3B8' : '#64748B',
                    textAlign: 'center',
                  }}
                >
                  {searchQuery || filter !== 'all'
                    ? 'Try adjusting your search query or filter.'
                    : 'Add a new task above to kickstart your day.'}
                </Text>
              </View>
            )
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
