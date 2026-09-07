import type React from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
  View,
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
  style,
  ...props
}: ButtonProps) {
  const getVariantButtonStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-600 active:bg-blue-700';
      case 'secondary':
        return 'bg-slate-100 active:bg-slate-200 dark:bg-slate-800 dark:active:bg-slate-700';
      case 'outline':
        return 'border border-slate-300 dark:border-slate-700 bg-transparent';
      case 'danger':
        return 'bg-red-600 active:bg-red-700';
      default:
        return 'bg-blue-600 active:bg-blue-700';
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
        return 'text-blue-600 dark:text-blue-400 font-medium text-center';
      default:
        return 'text-white font-semibold text-center';
    }
  };

  return (
    <TouchableOpacity
      className={`flex-row items-center justify-center py-4 px-6 rounded-2xl ${getVariantButtonStyles()} ${
        disabled || isLoading ? 'opacity-60' : ''
      } ${className}`}
      style={[
        {
          backgroundColor:
            variant === 'primary' ? '#2563EB' : variant === 'danger' ? '#DC2626' : undefined,
          borderRadius: 16,
          paddingVertical: 14,
          paddingHorizontal: 24,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
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
          {icon && <View style={{ marginRight: 8 }}>{icon}</View>}
          <Text
            className={`text-base ${getVariantTextStyles()}`}
            style={{
              color: variant === 'primary' || variant === 'danger' ? '#FFFFFF' : '#2563EB',
              fontSize: 16,
              fontWeight: '600',
              textAlign: 'center',
            }}
          >
            {label}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}
