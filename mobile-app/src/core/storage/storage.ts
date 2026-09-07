import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@todo_app:auth_token';
const USER_KEY = '@todo_app:user_data';
const ONBOARDING_KEY = '@todo_app:has_completed_onboarding';

export const storage = {
  async getHasCompletedOnboarding(): Promise<boolean> {
    try {
      const val = await AsyncStorage.getItem(ONBOARDING_KEY);
      return val === 'true';
    } catch {
      return false;
    }
  },

  async setHasCompletedOnboarding(completed = true): Promise<void> {
    try {
      await AsyncStorage.setItem(ONBOARDING_KEY, completed ? 'true' : 'false');
    } catch (error) {
      console.error('Failed to save onboarding state', error);
    }
  },
  async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },

  async setToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.error('Failed to save auth token', error);
    }
  },

  async clearToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error('Failed to clear auth token', error);
    }
  },

  async getUser<T>(): Promise<T | null> {
    try {
      const data = await AsyncStorage.getItem(USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  async setUser<T>(user: T): Promise<void> {
    try {
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Failed to save user', error);
    }
  },

  async clearAll(): Promise<void> {
    try {
      await Promise.all([AsyncStorage.removeItem(TOKEN_KEY), AsyncStorage.removeItem(USER_KEY)]);
    } catch (error) {
      console.error('Failed to clear storage', error);
    }
  },
};
