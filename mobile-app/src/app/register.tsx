import { useRouter } from 'expo-router';
import { RegisterScreen } from '@/features/auth';

export default function RegisterRoute() {
  const router = useRouter();

  return (
    <RegisterScreen
      onNavigateToLogin={() => {
        router.back();
      }}
    />
  );
}
