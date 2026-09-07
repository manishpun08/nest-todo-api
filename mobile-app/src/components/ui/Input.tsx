import { Eye, EyeOff } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Text,
  TextInput,
  type TextInputProps,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isPassword?: boolean;
}

export function Input({
  label,
  error,
  className = '',
  leftIcon,
  rightIcon,
  isPassword,
  secureTextEntry,
  style,
  onFocus,
  onBlur,
  ...props
}: InputProps) {
  const isDark = useColorScheme() === 'dark';
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const shouldBeSecure = isPassword ? !isPasswordVisible : secureTextEntry;

  return (
    <View style={{ width: '100%', marginBottom: 16 }}>
      {label ? (
        <Text
          style={{
            fontSize: 13,
            fontWeight: '600',
            color: isDark ? '#E2E8F0' : '#334155',
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
          borderColor: error ? '#EF4444' : isFocused ? '#3B82F6' : isDark ? '#334155' : '#CBD5E1',
          borderRadius: 14,
          paddingHorizontal: 14,
          minHeight: 52,
        }}
      >
        {leftIcon ? (
          <View style={{ marginRight: 10, alignItems: 'center', justifyContent: 'center' }}>
            {leftIcon}
          </View>
        ) : null}

        <TextInput
          style={[
            {
              flex: 1,
              fontSize: 15,
              fontWeight: '500',
              color: isDark ? '#FFFFFF' : '#0F172A',
              paddingVertical: 12,
            },
            style,
          ]}
          placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
          secureTextEntry={shouldBeSecure}
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

        {isPassword ? (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible((prev) => !prev)}
            style={{ padding: 6, marginLeft: 4 }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            activeOpacity={0.7}
          >
            {isPasswordVisible ? (
              <EyeOff size={18} color={isDark ? '#94A3B8' : '#64748B'} />
            ) : (
              <Eye size={18} color={isDark ? '#94A3B8' : '#64748B'} />
            )}
          </TouchableOpacity>
        ) : rightIcon ? (
          <View style={{ marginLeft: 8 }}>{rightIcon}</View>
        ) : null}
      </View>

      {error ? (
        <Text style={{ fontSize: 12, color: '#EF4444', marginTop: 4, fontWeight: '500' }}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}
