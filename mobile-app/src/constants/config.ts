import Constants from 'expo-constants';
import { Platform } from 'react-native';

const getDevHostIp = (): string => {
  const hostUri =
    Constants.expoConfig?.hostUri ||
    (Constants as unknown as { manifest2?: { extra?: { expoGo?: { debuggerHost?: string } } } })
      ?.manifest2?.extra?.expoGo?.debuggerHost ||
    (Constants as unknown as { manifest?: { debuggerHost?: string } })?.manifest?.debuggerHost;

  if (hostUri) {
    const ip = hostUri.split(':')[0];
    if (ip && ip !== 'localhost' && ip !== '127.0.0.1') {
      return ip;
    }
  }

  // Fallback for Android emulator
  if (Platform.OS === 'android') {
    return '10.0.2.2';
  }

  return '192.168.1.107'; // Fallback to current LAN IP for physical device testing
};

export const getApiBaseUrl = (): string => {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }

  // On Web browser running on PC
  if (Platform.OS === 'web') {
    return 'http://localhost:3000';
  }

  // On Native Mobile (Expo Go on physical phone / Android simulator / iOS simulator)
  const hostIp = getDevHostIp();
  return `http://${hostIp}:3000`;
};

export const config = {
  apiBaseUrl: getApiBaseUrl(),
  defaultPageLimit: 20,
  staleTimeMs: 1000 * 60 * 5, // 5 minutes
} as const;
