import { useRouter } from 'expo-router';
import { Lock, Mail, User, UserPlus } from 'lucide-react-native';
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

interface RegisterScreenProps {
  onNavigateToLogin?: () => void;
}

export function RegisterScreen({ onNavigateToLogin }: RegisterScreenProps) {
  const router = useRouter();
  const isDark = useColorScheme() === 'dark';
  const toast = useToast();
  const { register, isRegistering, registerError } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleRegister = async () => {
    setValidationError(null);
    if (!name.trim() || !email.trim() || !password) {
      const err = 'Please fill in all fields.';
      setValidationError(err);
      toast.showError(err);
      return;
    }

    if (password.length < 6) {
      const err = 'Password must be at least 6 characters long.';
      setValidationError(err);
      toast.showError(err);
      return;
    }

    try {
      await register({
        name: name.trim(),
        email: email.trim(),
        password,
      });
      toast.showSuccess('Account created successfully! Welcome aboard.', 'Success');
      // Redirect to home dashboard
      router.replace('/');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Registration failed. Please try again.';
      setValidationError(msg);
      toast.showError(msg, 'Registration Error');
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
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            paddingHorizontal: 24,
            paddingVertical: 32,
          }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header Branding */}
          <View style={{ alignItems: 'center', marginBottom: 32 }}>
            <View
              style={{
                width: 72,
                height: 72,
                borderRadius: 22,
                backgroundColor: isDark ? 'rgba(37, 99, 235, 0.2)' : '#EFF6FF',
                borderWidth: 1.5,
                borderColor: isDark ? 'rgba(37, 99, 235, 0.4)' : '#BFDBFE',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
              }}
            >
              <UserPlus size={36} color="#2563EB" strokeWidth={2.2} />
            </View>

            <Typography
              variant="h1"
              style={{
                fontSize: 28,
                fontWeight: '800',
                color: isDark ? '#FFFFFF' : '#0F172A',
                marginBottom: 8,
              }}
            >
              Create Account
            </Typography>
            <Typography
              variant="body"
              style={{
                fontSize: 15,
                color: isDark ? '#94A3B8' : '#64748B',
                textAlign: 'center',
              }}
            >
              Join to organize tasks and stay synchronized.
            </Typography>
          </View>

          {/* Register Card */}
          <Card style={{ padding: 22 }}>
            {validationError || registerError ? (
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
                  {validationError || registerError || 'Registration failed. Please try again.'}
                </Text>
              </View>
            ) : null}

            <Input
              label="Full Name"
              placeholder="Alex Johnson"
              autoCapitalize="words"
              value={name}
              onChangeText={setName}
              leftIcon={<User size={18} color={isDark ? '#64748B' : '#94A3B8'} />}
            />

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
              label="Password (min. 6 characters)"
              placeholder="••••••••"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              leftIcon={<Lock size={18} color={isDark ? '#64748B' : '#94A3B8'} />}
            />

            <Button
              label="Create Account"
              onPress={handleRegister}
              isLoading={isRegistering}
              style={{ marginTop: 10 }}
            />
          </Card>

          {/* Toggle to Login */}
          {onNavigateToLogin ? (
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
                Already have an account?{' '}
              </Text>
              <TouchableOpacity onPress={onNavigateToLogin} activeOpacity={0.7}>
                <Text
                  style={{
                    color: '#2563EB',
                    fontWeight: '700',
                    fontSize: 14,
                  }}
                >
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
