import { Text, useColorScheme, View, type ViewStyle } from 'react-native';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
  style?: ViewStyle;
}

export function Badge({ label, variant = 'primary', style }: BadgeProps) {
  const isDark = useColorScheme() === 'dark';

  const getVariantColors = () => {
    switch (variant) {
      case 'success':
        return {
          bg: isDark ? 'rgba(16, 185, 129, 0.2)' : '#ECFDF5',
          border: isDark ? 'rgba(16, 185, 129, 0.4)' : '#A7F3D0',
          text: isDark ? '#34D399' : '#059669',
        };
      case 'warning':
        return {
          bg: isDark ? 'rgba(245, 158, 11, 0.2)' : '#FFFBEB',
          border: isDark ? 'rgba(245, 158, 11, 0.4)' : '#FDE68A',
          text: isDark ? '#FBBF24' : '#D97706',
        };
      case 'danger':
        return {
          bg: isDark ? 'rgba(239, 68, 68, 0.2)' : '#FEF2F2',
          border: isDark ? 'rgba(239, 68, 68, 0.4)' : '#FECACA',
          text: isDark ? '#F87171' : '#DC2626',
        };
      case 'neutral':
        return {
          bg: isDark ? '#334155' : '#F1F5F9',
          border: isDark ? '#475569' : '#E2E8F0',
          text: isDark ? '#94A3B8' : '#64748B',
        };
      default:
        return {
          bg: isDark ? 'rgba(59, 130, 246, 0.2)' : '#EFF6FF',
          border: isDark ? 'rgba(59, 130, 246, 0.4)' : '#BFDBFE',
          text: isDark ? '#60A5FA' : '#2563EB',
        };
    }
  };

  const colors = getVariantColors();

  return (
    <View
      style={[
        {
          backgroundColor: colors.bg,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 9999,
          paddingHorizontal: 10,
          paddingVertical: 3,
          alignSelf: 'flex-start',
        },
        style,
      ]}
    >
      <Text
        style={{
          color: colors.text,
          fontSize: 11,
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        }}
      >
        {label}
      </Text>
    </View>
  );
}
