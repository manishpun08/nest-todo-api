import { Text, type TextProps, useColorScheme } from 'react-native';

interface TypographyProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'muted';
  className?: string;
}

export function Typography({
  variant = 'body',
  className = '',
  style,
  children,
  ...props
}: TypographyProps) {
  const isDark = useColorScheme() === 'dark';

  const getVariantStyles = () => {
    switch (variant) {
      case 'h1':
        return 'text-3xl font-bold text-slate-900 dark:text-white';
      case 'h2':
        return 'text-2xl font-bold text-slate-900 dark:text-white';
      case 'h3':
        return 'text-xl font-semibold text-slate-800 dark:text-slate-100';
      case 'body':
        return 'text-base text-slate-700 dark:text-slate-200';
      case 'caption':
        return 'text-sm text-slate-500 dark:text-slate-400';
      case 'muted':
        return 'text-xs text-slate-400 dark:text-slate-500';
      default:
        return 'text-base text-slate-700 dark:text-slate-200';
    }
  };

  const getFallbackColor = () => {
    if (variant === 'caption' || variant === 'muted') {
      return isDark ? '#94A3B8' : '#64748B';
    }
    return isDark ? '#F8FAFC' : '#0F172A';
  };

  const getFallbackFontSize = () => {
    switch (variant) {
      case 'h1':
        return { fontSize: 28, fontWeight: '800' as const };
      case 'h2':
        return { fontSize: 22, fontWeight: '700' as const };
      case 'h3':
        return { fontSize: 18, fontWeight: '600' as const };
      case 'caption':
        return { fontSize: 13, fontWeight: '500' as const };
      case 'muted':
        return { fontSize: 11, fontWeight: '400' as const };
      default:
        return { fontSize: 15, fontWeight: '400' as const };
    }
  };

  return (
    <Text
      className={`${getVariantStyles()} ${className}`}
      style={[
        {
          color: getFallbackColor(),
          ...getFallbackFontSize(),
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}
