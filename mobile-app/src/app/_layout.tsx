import '../global.css';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { LogBox, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '@/providers/AuthProvider';
import { QueryProvider } from '@/providers/QueryProvider';
import { ToastProvider } from '@/providers/ToastProvider';

SplashScreen.preventAutoHideAsync().catch(() => {});

LogBox.ignoreLogs([
  '"shadow*" style props are deprecated',
  'props.pointerEvents is deprecated',
  '[Reanimated]',
  'Animated: `useNativeDriver` is not supported',
]);

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  return (
    <SafeAreaProvider>
      <QueryProvider>
        <AuthProvider>
          <ToastProvider>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
                <Stack.Screen name="index" options={{ title: 'Tasks' }} />
                <Stack.Screen name="onboarding" options={{ title: 'Welcome', animation: 'fade' }} />
                <Stack.Screen
                  name="login"
                  options={{ title: 'Sign In', animation: 'slide_from_right' }}
                />
                <Stack.Screen
                  name="register"
                  options={{ title: 'Create Account', animation: 'slide_from_right' }}
                />
              </Stack>
            </ThemeProvider>
          </ToastProvider>
        </AuthProvider>
      </QueryProvider>
    </SafeAreaProvider>
  );
}
