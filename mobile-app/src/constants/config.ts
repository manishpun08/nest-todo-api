export const config = {
  apiBaseUrl: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000',
  defaultPageLimit: 20,
  staleTimeMs: 1000 * 60 * 5, // 5 minutes
} as const;
