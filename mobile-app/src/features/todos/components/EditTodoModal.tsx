import { Edit3, X } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import type { Todo } from '../types';

export interface EditTodoModalProps {
  visible: boolean;
  todo: Todo | null;
  isLoading?: boolean;
  onSave: (id: string, title: string, description?: string) => Promise<void>;
  onClose: () => void;
}

export function EditTodoModal({
  visible,
  todo,
  isLoading = false,
  onSave,
  onClose,
}: EditTodoModalProps) {
  const isDark = useColorScheme() === 'dark';
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description || '');
      setError(null);
    }
  }, [todo]);

  const handleSave = async () => {
    if (!title.trim()) {
      setError('Task title cannot be empty.');
      return;
    }
    if (!todo) return;

    setError(null);
    await onSave(todo.id, title.trim(), description.trim() || undefined);
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />
        <View
          style={[
            styles.sheetContainer,
            {
              backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
              borderColor: isDark ? '#334155' : '#E2E8F0',
            },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={[
                  styles.iconWrap,
                  {
                    backgroundColor: isDark ? 'rgba(59, 130, 246, 0.2)' : '#EFF6FF',
                  },
                ]}
              >
                <Edit3 size={18} color="#3B82F6" strokeWidth={2.4} />
              </View>
              <Text
                style={[
                  styles.title,
                  {
                    color: isDark ? '#FFFFFF' : '#0F172A',
                  },
                ]}
              >
                Edit Task
              </Text>
            </View>

            <TouchableOpacity
              onPress={onClose}
              style={styles.closeBtn}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <X size={20} color={isDark ? '#94A3B8' : '#64748B'} />
            </TouchableOpacity>
          </View>

          <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            {error ? (
              <View
                style={{
                  backgroundColor: isDark ? 'rgba(239, 68, 68, 0.15)' : '#FEF2F2',
                  padding: 10,
                  borderRadius: 10,
                  marginBottom: 12,
                }}
              >
                <Text style={{ color: '#EF4444', fontSize: 13, fontWeight: '500' }}>{error}</Text>
              </View>
            ) : null}

            <Input
              label="Task Title"
              value={title}
              onChangeText={setTitle}
              placeholder="What needs to be done?"
            />

            <Input
              label="Notes / Description (optional)"
              value={description}
              onChangeText={setDescription}
              placeholder="Add more context or details"
              multiline
            />

            <View style={{ flexDirection: 'row', gap: 10, marginTop: 8 }}>
              <Button label="Cancel" variant="outline" onPress={onClose} style={{ flex: 1 }} />
              <Button
                label="Save Changes"
                onPress={handleSave}
                isLoading={isLoading}
                disabled={!title.trim()}
                style={{ flex: 1.5 }}
              />
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
  },
  sheetContainer: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderTopWidth: 1.5,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 36,
    maxHeight: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
  },
  closeBtn: {
    padding: 4,
  },
});
