import { CheckCircle2, LogOut, Plus, Sparkles } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Input } from '@/components/ui/Input';
import { TodoCardSkeleton } from '@/components/ui/Skeleton';
import { Typography } from '@/components/ui/Typography';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useToast } from '@/providers/ToastProvider';
import { EditTodoModal } from '../components/EditTodoModal';
import { TodoCard } from '../components/TodoCard';
import { type FilterStatus, TodoFilters } from '../components/TodoFilters';
import { TodoStats } from '../components/TodoStats';
import { useTodos } from '../hooks/useTodos';
import type { Todo } from '../types';

export function TodoListScreen() {
  const isDark = useColorScheme() === 'dark';
  const toast = useToast();
  const { user, logout } = useAuth();
  const {
    todos,
    isLoading,
    isRefetching,
    refetch,
    isCreating,
    createTodo,
    updateTodo,
    isUpdating,
    toggleTodo,
    deleteTodo,
  } = useTodos();

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [deletingTodoId, setDeletingTodoId] = useState<string | null>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutPress = () => {
    setShowLogoutConfirm(true);
  };

  const handleConfirmLogout = async () => {
    setShowLogoutConfirm(false);
    try {
      await logout();
      toast.showInfo('You have been successfully signed out.', 'Signed Out');
    } catch {
      toast.showError('Could not complete sign out', 'Notice');
    }
  };

  const handleCreate = async () => {
    if (!newTitle.trim()) return;
    try {
      await createTodo({
        title: newTitle.trim(),
        description: newDescription.trim() || undefined,
      });
      toast.showSuccess('Task added to your list!', 'Task Created');
      setNewTitle('');
      setNewDescription('');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Could not create task';
      toast.showError(msg, 'Error');
    }
  };

  const handleSaveEdit = async (id: string, title: string, description?: string) => {
    try {
      await updateTodo({
        id,
        input: { title, description },
      });
      setEditingTodo(null);
      toast.showSuccess('Task updated successfully!', 'Saved');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Could not update task';
      toast.showError(msg, 'Error');
    }
  };

  const handleDeletePress = (id: string) => {
    setDeletingTodoId(id);
  };

  const handleConfirmDelete = async () => {
    if (!deletingTodoId) return;
    const id = deletingTodoId;
    setDeletingTodoId(null);
    try {
      await deleteTodo(id);
      toast.showInfo('Task has been removed', 'Deleted');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Could not delete task';
      toast.showError(msg, 'Error');
    }
  };

  const handleToggle = async (id: string) => {
    try {
      await toggleTodo(id);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Could not update task';
      toast.showError(msg, 'Error');
    }
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
              onToggle={handleToggle}
              onDelete={handleDeletePress}
              onEdit={(todo) => setEditingTodo(todo)}
            />
          )}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: 40,
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
              tintColor="#3B82F6"
              colors={['#3B82F6']}
            />
          }
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
                    onPress={handleLogoutPress}
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
              <View style={{ gap: 10, paddingTop: 8 }}>
                <TodoCardSkeleton />
                <TodoCardSkeleton />
                <TodoCardSkeleton />
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

      {/* Edit Task Modal */}
      <EditTodoModal
        visible={!!editingTodo}
        todo={editingTodo}
        isLoading={isUpdating}
        onSave={handleSaveEdit}
        onClose={() => setEditingTodo(null)}
      />

      {/* Delete Task Confirmation Dialog */}
      <ConfirmDialog
        visible={!!deletingTodoId}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isDestructive
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingTodoId(null)}
      />

      {/* Logout Confirmation Dialog */}
      <ConfirmDialog
        visible={showLogoutConfirm}
        title="Sign Out"
        message="Are you sure you want to sign out of your account? You will need to log in again to access your tasks."
        confirmText="Sign Out"
        cancelText="Stay Signed In"
        isDestructive
        onConfirm={handleConfirmLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </SafeAreaView>
  );
}
