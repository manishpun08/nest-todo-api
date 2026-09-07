import React, { useState } from 'react';
import { Text, TextInput, type TextInputProps, useColorScheme, View } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Input({
  label,
  error,
  className = '',
  leftIcon,
  rightIcon,
  style,
  onFocus,
  onBlur,
  ...props
}: InputProps) {
  const isDark = useColorScheme() === 'dark';
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={{ width: '100%', marginBottom: 14 }}>
      {label ? (
        <Text
          style={{
            fontSize: 13,
            fontWeight: '600',
            color: isDark ? '#CBD5E1' : '#334155',
            marginBottom: 6,
          }}
        >
          {label}
        </Text>
      ) : null}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: isDark ? '#1E293B' : '#F8FAFC',
          borderWidth: 1.5,
          borderColor: error ? '#EF4444' : isFocused ? '#3B82F6' : isDark ? '#334155' : '#E2E8F0',
          borderRadius: 14,
          paddingHorizontal: 14,
          paddingVertical: 4,
          minHeight: 48,
        }}
      >
        {leftIcon ? <View style={{ marginRight: 10 }}>{leftIcon}</View> : null}

        <TextInput
          style={[
            {
              flex: 1,
              fontSize: 15,
              color: isDark ? '#FFFFFF' : '#0F172A',
              paddingVertical: 8,
            },
            style,
          ]}
          placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          {...props}
        />

        {rightIcon ? <View style={{ marginLeft: 10 }}>{rightIcon}</View> : null}
      </View>

      {error ? (
        <Text style={{ fontSize: 12, color: '#EF4444', marginTop: 4, fontWeight: '500' }}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}
