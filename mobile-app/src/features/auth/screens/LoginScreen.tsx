import { useRouter } from 'expo-router';
import { Lock, LogIn, Mail } from 'lucide-react-native';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Typography } from '@/components/ui/Typography';
import { useToast } from '@/providers/ToastProvider';
import { useAuth } from '../hooks/useAuth';

interface LoginScreenProps {
  onNavigateToRegister?: () => void;
}

export function LoginScreen({ onNavigateToRegister }: LoginScreenProps) {
  const router = useRouter();
  const isDark = useColorScheme() === 'dark';
  const toast = useToast();
  const { login, isLoggingIn, loginError } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleLogin = async () => {
    setValidationError(null);
    if (!email.trim() || !password) {
      const err = 'Please enter both email and password.';
      setValidationError(err);
      toast.showError(err);
      return;
    }

    try {
      await login({ email: email.trim(), password });
      toast.showSuccess('Welcome back! Successfully signed in.', 'Success');
      router.replace('/');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Invalid credentials. Please try again.';
      setValidationError(msg);
      toast.showError(msg, 'Authentication Failed');
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDark ? '#090D16' : '#F8FAFC',
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            paddingHorizontal: 24,
            paddingTop: 20,
            paddingBottom: 48,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header Branding */}
          <View style={{ alignItems: 'center', marginBottom: 28 }}>
            <View
              style={{
                width: 68,
                height: 68,
                borderRadius: 22,
                backgroundColor: isDark ? 'rgba(37, 99, 235, 0.2)' : '#EFF6FF',
                borderWidth: 1.5,
                borderColor: isDark ? 'rgba(37, 99, 235, 0.4)' : '#BFDBFE',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 14,
              }}
            >
              <LogIn size={34} color="#2563EB" strokeWidth={2.2} />
            </View>

            <Typography
              variant="h1"
              style={{
                fontSize: 26,
                fontWeight: '800',
                color: isDark ? '#FFFFFF' : '#0F172A',
                marginBottom: 6,
              }}
            >
              Welcome Back
            </Typography>
            <Typography
              variant="body"
              style={{
                fontSize: 14,
                color: isDark ? '#94A3B8' : '#64748B',
                textAlign: 'center',
              }}
            >
              Sign in to manage your tasks and productivity.
            </Typography>
          </View>

          {/* Login Card */}
          <Card style={{ padding: 20 }}>
            {validationError || loginError ? (
              <View
                style={{
                  backgroundColor: isDark ? 'rgba(239, 68, 68, 0.15)' : '#FEF2F2',
                  borderWidth: 1,
                  borderColor: isDark ? 'rgba(239, 68, 68, 0.3)' : '#FECACA',
                  padding: 12,
                  borderRadius: 12,
                  marginBottom: 16,
                }}
              >
                <Text style={{ color: '#EF4444', fontSize: 13, fontWeight: '500' }}>
                  {validationError || loginError || 'Login failed. Please check credentials.'}
                </Text>
              </View>
            ) : null}

            <Input
              label="Email Address"
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
              leftIcon={<Mail size={18} color={isDark ? '#64748B' : '#94A3B8'} />}
            />

            <Input
              label="Password"
              placeholder="••••••••"
              isPassword
              value={password}
              onChangeText={setPassword}
              leftIcon={<Lock size={18} color={isDark ? '#64748B' : '#94A3B8'} />}
            />

            <Button
              label="Sign In"
              onPress={handleLogin}
              isLoading={isLoggingIn}
              style={{ marginTop: 6 }}
            />
          </Card>

          {/* Toggle to Register */}
          {onNavigateToRegister ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 24,
              }}
            >
              <Text
                style={{
                  color: isDark ? '#94A3B8' : '#64748B',
                  fontSize: 14,
                }}
              >
                Don't have an account?{' '}
              </Text>
              <TouchableOpacity onPress={onNavigateToRegister} activeOpacity={0.7}>
                <Text
                  style={{
                    color: '#2563EB',
                    fontWeight: '700',
                    fontSize: 14,
                  }}
                >
                  Create Account
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
