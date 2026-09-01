import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type React from 'react';
import { config } from '@/constants/config';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: config.staleTimeMs,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

interface QueryProviderProps {
  children: React.ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
