import React from 'react';
import { useColorScheme, View, type ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className = '', style, children, ...props }: CardProps) {
  const isDark = useColorScheme() === 'dark';

  return (
    <View
      style={[
        {
          backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
          borderWidth: 1,
          borderColor: isDark ? '#334155' : '#E2E8F0',
          borderRadius: 20,
          padding: 18,
          shadowColor: isDark ? '#000000' : '#64748B',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: isDark ? 0.4 : 0.06,
          shadowRadius: 12,
          elevation: 3,
        },
        style,
      ]}
      className={`bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 shadow-sm ${className}`}
      {...props}
    >
      {children}
    </View>
  );
}
