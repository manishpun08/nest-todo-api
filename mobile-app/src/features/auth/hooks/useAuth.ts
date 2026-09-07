import { useMutation } from '@tanstack/react-query';
import { useAuthContext } from '@/providers/AuthProvider';
import { authService } from '../services/auth.service';
import type { LoginDTO, RegisterDTO } from '../types';

export function useAuth() {
  const {
    user,
    isAuthenticated,
    isLoading,
    login: setAuthSession,
    logout: clearAuthSession,
  } = useAuthContext();

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginDTO) => {
      const result = await authService.login(credentials);
      await setAuthSession(result.accessToken, result.user);
      return result;
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterDTO) => {
      await authService.register(data);
      // Automatically log in after registration
      const loginResult = await authService.login({
        email: data.email,
        password: data.password,
      });
      await setAuthSession(loginResult.accessToken, loginResult.user);
      return loginResult;
    },
  });

  const logout = async () => {
    await authService.logout();
    await clearAuthSession();
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error instanceof Error ? loginMutation.error.message : null,
    register: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error instanceof Error ? registerMutation.error.message : null,
    logout,
  };
}
