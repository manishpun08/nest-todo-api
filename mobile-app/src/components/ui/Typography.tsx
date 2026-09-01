import { Text, type TextProps } from 'react-native';

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

  return (
    <Text className={`${getVariantStyles()} ${className}`} style={style} {...props}>
      {children}
    </Text>
  );
}
