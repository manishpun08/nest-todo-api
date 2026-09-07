import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const TOKEN_KEY = '@todo_app:auth_token';
const USER_KEY = '@todo_app:user_data';
const ONBOARDING_KEY = '@todo_app:has_completed_onboarding';

// Memory storage fallback in case native AsyncStorage module is unavailable
const memoryFallback = new Map<string, string>();

async function safeGetItem(key: string): Promise<string | null> {
  try {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(key);
    }
    const value = await AsyncStorage.getItem(key);
    if (value !== null) return value;
    return memoryFallback.get(key) ?? null;
  } catch {
    return memoryFallback.get(key) ?? null;
  }
}

async function safeSetItem(key: string, value: string): Promise<void> {
  memoryFallback.set(key, value);
  try {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
      return;
    }
    await AsyncStorage.setItem(key, value);
  } catch {
    // Gracefully stored in memoryFallback
  }
}

async function safeRemoveItem(key: string): Promise<void> {
  memoryFallback.delete(key);
  try {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(key);
      return;
    }
    await AsyncStorage.removeItem(key);
  } catch {
    // Gracefully removed from memoryFallback
  }
}

export const storage = {
  async getHasCompletedOnboarding(): Promise<boolean> {
    const val = await safeGetItem(ONBOARDING_KEY);
    return val === 'true';
  },

  async setHasCompletedOnboarding(completed = true): Promise<void> {
    await safeSetItem(ONBOARDING_KEY, completed ? 'true' : 'false');
  },

  async getToken(): Promise<string | null> {
    return await safeGetItem(TOKEN_KEY);
  },

  async setToken(token: string): Promise<void> {
    await safeSetItem(TOKEN_KEY, token);
  },

  async clearToken(): Promise<void> {
    await safeRemoveItem(TOKEN_KEY);
  },

  async getUser<T>(): Promise<T | null> {
    try {
      const data = await safeGetItem(USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  async setUser<T>(user: T): Promise<void> {
    await safeSetItem(USER_KEY, JSON.stringify(user));
  },

  async clearAll(): Promise<void> {
    await safeRemoveItem(TOKEN_KEY);
    await safeRemoveItem(USER_KEY);
  },
};
