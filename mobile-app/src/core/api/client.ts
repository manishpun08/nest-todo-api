import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { config } from '@/constants/config';
import { storage } from '@/core/storage/storage';
import type { ApiResponseEnvelope } from './types';

export const apiClient: AxiosInstance = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
apiClient.interceptors.request.use(
  async (reqConfig: InternalAxiosRequestConfig) => {
    const token = await storage.getToken();
    if (token && reqConfig.headers) {
      reqConfig.headers.Authorization = `Bearer ${token}`;
    }
    return reqConfig;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // If backend wrapped in standard envelope, unwrap data or return response
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      const envelope = response.data as ApiResponseEnvelope<unknown>;
      return {
        ...response,
        data: envelope.data,
      };
    }
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      await storage.clearToken();
    }

    const resData = error.response?.data;
    let message = 'An unexpected error occurred';

    if (resData) {
      if (typeof resData.message === 'string') {
        message = resData.message;
      } else if (Array.isArray(resData.message)) {
        message = resData.message.join(', ');
      } else if (typeof resData.error === 'string') {
        message = resData.error;
      }
    } else if (error.message) {
      message = error.message;
    }

    const enhancedError = new Error(message);
    return Promise.reject(enhancedError);
  },
);
