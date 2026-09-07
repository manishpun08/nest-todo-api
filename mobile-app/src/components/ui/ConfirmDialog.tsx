import { AlertTriangle } from 'lucide-react-native';
import { Modal, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';

export interface ConfirmDialogProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  visible,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDestructive = true,
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const isDark = useColorScheme() === 'dark';

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onCancel}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View
          style={[
            styles.dialogContainer,
            {
              backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
              borderColor: isDark ? '#334155' : '#E2E8F0',
            },
          ]}
        >
          {/* Header Icon */}
          <View
            style={[
              styles.iconWrapper,
              {
                backgroundColor: isDestructive
                  ? isDark
                    ? 'rgba(239, 68, 68, 0.15)'
                    : '#FEF2F2'
                  : isDark
                    ? 'rgba(59, 130, 246, 0.15)'
                    : '#EFF6FF',
              },
            ]}
          >
            <AlertTriangle
              size={28}
              color={isDestructive ? '#EF4444' : '#3B82F6'}
              strokeWidth={2.2}
            />
          </View>

          {/* Title & Message */}
          <Text
            style={[
              styles.title,
              {
                color: isDark ? '#FFFFFF' : '#0F172A',
              },
            ]}
          >
            {title}
          </Text>

          <Text
            style={[
              styles.message,
              {
                color: isDark ? '#94A3B8' : '#64748B',
              },
            ]}
          >
            {message}
          </Text>

          {/* Action Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              onPress={onCancel}
              disabled={isLoading}
              style={[
                styles.button,
                styles.cancelButton,
                {
                  backgroundColor: isDark ? '#0F172A' : '#F1F5F9',
                  borderColor: isDark ? '#334155' : '#E2E8F0',
                },
              ]}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: isDark ? '#E2E8F0' : '#475569',
                  },
                ]}
              >
                {cancelText}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onConfirm}
              disabled={isLoading}
              style={[
                styles.button,
                {
                  backgroundColor: isDestructive ? '#EF4444' : '#2563EB',
                },
              ]}
              activeOpacity={0.8}
            >
              <Text style={[styles.buttonText, { color: '#FFFFFF', fontWeight: '700' }]}>
                {confirmText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  dialogContainer: {
    width: '100%',
    maxWidth: 380,
    borderRadius: 24,
    borderWidth: 1.5,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
  },
});
