import { AlertCircle, CheckCircle, Info, X } from 'lucide-react-native';
import type React from 'react';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastOptions {
  id?: string;
  type?: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

interface ToastContextValue {
  showToast: (options: ToastOptions) => void;
  showSuccess: (message: string, title?: string) => void;
  showError: (message: string, title?: string) => void;
  showInfo: (message: string, title?: string) => void;
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

interface ToastItem extends ToastOptions {
  id: string;
}

function ToastBanner({ item, onDismiss }: { item: ToastItem; onDismiss: () => void }) {
  const isDark = useColorScheme() === 'dark';
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-30)).current;

  const handleDismiss = useCallback(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -20,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss();
    });
  }, [fadeAnim, slideAnim, onDismiss]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      handleDismiss();
    }, item.duration || 3500);

    return () => clearTimeout(timer);
  }, [item.duration, slideAnim, handleDismiss, fadeAnim]);

  const getStyleConfig = () => {
    switch (item.type) {
      case 'success':
        return {
          borderColor: isDark ? 'rgba(16, 185, 129, 0.4)' : '#A7F3D0',
          bgColor: isDark ? 'rgba(6, 78, 59, 0.95)' : '#ECFDF5',
          iconColor: '#10B981',
          textColor: isDark ? '#ECFDF5' : '#065F46',
          titleColor: isDark ? '#A7F3D0' : '#047857',
          Icon: CheckCircle,
        };
      case 'error':
        return {
          borderColor: isDark ? 'rgba(239, 68, 68, 0.4)' : '#FECACA',
          bgColor: isDark ? 'rgba(127, 29, 29, 0.95)' : '#FEF2F2',
          iconColor: '#EF4444',
          textColor: isDark ? '#FEF2F2' : '#991B1B',
          titleColor: isDark ? '#FECACA' : '#B91C1C',
          Icon: AlertCircle,
        };
      default:
        return {
          borderColor: isDark ? 'rgba(59, 130, 246, 0.4)' : '#BFDBFE',
          bgColor: isDark ? 'rgba(30, 58, 138, 0.95)' : '#EFF6FF',
          iconColor: '#3B82F6',
          textColor: isDark ? '#EFF6FF' : '#1E40AF',
          titleColor: isDark ? '#BFDBFE' : '#1D4ED8',
          Icon: Info,
        };
    }
  };

  const config = getStyleConfig();
  const IconComponent = config.Icon;

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
          backgroundColor: config.bgColor,
          borderColor: config.borderColor,
        },
      ]}
    >
      <View style={styles.iconContainer}>
        <IconComponent size={20} color={config.iconColor} strokeWidth={2.4} />
      </View>

      <View style={styles.textContainer}>
        {item.title ? (
          <Text style={[styles.title, { color: config.titleColor }]}>{item.title}</Text>
        ) : null}
        <Text style={[styles.message, { color: config.textColor }]}>{item.message}</Text>
      </View>

      <TouchableOpacity
        onPress={handleDismiss}
        style={styles.closeBtn}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <X size={16} color={config.iconColor} />
      </TouchableOpacity>
    </Animated.View>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const insets = useSafeAreaInsets();

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((options: ToastOptions) => {
    const id = options.id || `${Date.now()}_${Math.random()}`;
    const newToast: ToastItem = { ...options, id };
    setToasts((prev) => [...prev.slice(-2), newToast]); // keep max 3 at a time
  }, []);

  const showSuccess = useCallback(
    (message: string, title?: string) => {
      showToast({ type: 'success', message, title: title ?? 'Success' });
    },
    [showToast],
  );

  const showError = useCallback(
    (message: string, title?: string) => {
      showToast({ type: 'error', message, title: title ?? 'Error' });
    },
    [showToast],
  );

  const showInfo = useCallback(
    (message: string, title?: string) => {
      showToast({ type: 'info', message, title: title ?? 'Notice' });
    },
    [showToast],
  );

  return (
    <ToastContext.Provider value={{ showToast, showSuccess, showError, showInfo, hideToast }}>
      {children}
      <View
        style={[styles.floatingLayer, { top: Math.max(insets.top + 10, 20) }]}
        pointerEvents="box-none"
      >
        {toasts.map((toast) => (
          <ToastBanner key={toast.id} item={toast} onDismiss={() => hideToast(toast.id)} />
        ))}
      </View>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

const styles = StyleSheet.create({
  floatingLayer: {
    position: 'absolute',
    left: 16,
    right: 16,
    zIndex: 9999,
    alignItems: 'center',
    gap: 8,
  },
  toastContainer: {
    width: '100%',
    maxWidth: 480,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1.2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  iconContainer: {
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  message: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
  },
  closeBtn: {
    padding: 4,
    opacity: 0.8,
  },
});
