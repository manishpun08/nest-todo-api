import type React from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  isLoading?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export function Button({
  label,
  variant = 'primary',
  isLoading = false,
  className = '',
  disabled,
  icon,
  ...props
}: ButtonProps) {
  const getVariantButtonStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-600 active:bg-blue-700 text-white';
      case 'secondary':
        return 'bg-slate-100 active:bg-slate-200 dark:bg-slate-800 dark:active:bg-slate-700 text-slate-900 dark:text-white';
      case 'outline':
        return 'border border-slate-300 dark:border-slate-700 bg-transparent text-slate-800 dark:text-slate-200';
      case 'danger':
        return 'bg-red-600 active:bg-red-700 text-white';
      default:
        return 'bg-blue-600 active:bg-blue-700 text-white';
    }
  };

  const getVariantTextStyles = () => {
    switch (variant) {
      case 'primary':
      case 'danger':
        return 'text-white font-semibold text-center';
      case 'secondary':
        return 'text-slate-900 dark:text-white font-medium text-center';
      case 'outline':
        return 'text-slate-800 dark:text-slate-200 font-medium text-center';
      default:
        return 'text-white font-semibold text-center';
    }
  };

  return (
    <TouchableOpacity
      className={`flex-row items-center justify-center py-3.5 px-5 rounded-xl shadow-sm ${getVariantButtonStyles()} ${
        disabled || isLoading ? 'opacity-60' : ''
      } ${className}`}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator
          color={variant === 'outline' || variant === 'secondary' ? '#3B82F6' : '#FFFFFF'}
        />
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          <Text className={`text-base ${getVariantTextStyles()}`}>{label}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}
