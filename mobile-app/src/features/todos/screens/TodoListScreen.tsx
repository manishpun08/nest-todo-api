import { useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Typography } from '@/components/ui/Typography';
import { TodoCard } from '../components/TodoCard';
import { useTodos } from '../hooks/useTodos';

export function TodoListScreen() {
  const { todos, isLoading, isCreating, createTodo, toggleTodo, deleteTodo } = useTodos();
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const handleCreate = async () => {
    if (!newTitle.trim()) return;
    await createTodo({ title: newTitle.trim(), description: newDescription.trim() || undefined });
    setNewTitle('');
    setNewDescription('');
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-950">
      <View className="flex-1 p-5">
        <Typography variant="h1" className="mb-4 font-extrabold text-blue-600 dark:text-blue-400">
          My Tasks
        </Typography>

        <View className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 mb-5 shadow-sm">
          <Input placeholder="What needs to be done?" value={newTitle} onChangeText={setNewTitle} />
          <Input
            placeholder="Details / notes (optional)"
            value={newDescription}
            onChangeText={setNewDescription}
          />
          <Button
            label="Add Task"
            onPress={handleCreate}
            isLoading={isCreating}
            disabled={!newTitle.trim()}
          />
        </View>

        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#3B82F6" />
          </View>
        ) : (
          <FlatList
            data={todos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TodoCard
                todo={item}
                onToggle={(id) => toggleTodo(id)}
                onDelete={(id) => deleteTodo(id)}
              />
            )}
            ListEmptyComponent={
              <View className="items-center justify-center py-12">
                <Typography variant="caption">No tasks yet. Create one above!</Typography>
              </View>
            }
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
