import { useRouter } from 'expo-router';
import { LoginScreen } from '@/features/auth';

export default function LoginRoute() {
  const router = useRouter();

  return (
    <LoginScreen
      onNavigateToRegister={() => {
        router.push('/register');
      }}
    />
  );
}
