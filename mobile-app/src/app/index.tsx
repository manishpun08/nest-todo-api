import { Redirect, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { storage } from '@/core/storage/storage';
import { LoginScreen } from '@/features/auth';
import { OnboardingScreen } from '@/features/onboarding';
import { useAuthContext } from '@/providers/AuthProvider';

export default function HomeScreen() {
  const router = useRouter();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuthContext();
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkOnboarding() {
      const completed = await storage.getHasCompletedOnboarding();
      setHasCompletedOnboarding(completed);
    }
    checkOnboarding();
  }, []);

  if (hasCompletedOnboarding === null || isAuthLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#090D16',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  // 1. First-time launch -> Onboarding
  if (!hasCompletedOnboarding) {
    return <OnboardingScreen onComplete={() => setHasCompletedOnboarding(true)} />;
  }

  // 2. Unauthenticated -> Login Screen
  if (!isAuthenticated) {
    return (
      <LoginScreen
        onNavigateToRegister={() => {
          router.push('/register');
        }}
      />
    );
  }

  // 3. Authenticated -> Bottom Tabs Dashboard
  return <Redirect href="/(tabs)" />;
}
