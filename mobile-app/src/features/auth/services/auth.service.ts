import { API_ENDPOINTS } from '@/constants/endpoints';
import { apiClient } from '@/core/api/client';
import type { AuthResponseDTO, LoginDTO, RegisterDTO } from '../types';

export const authService = {
  login: async (credentials: LoginDTO): Promise<AuthResponseDTO> => {
    const response = await apiClient.post<AuthResponseDTO>(API_ENDPOINTS.AUTH.LOGIN, credentials);
    return response.data;
  },

  register: async (data: RegisterDTO): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, data);
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.get('/auth/logout');
    } catch {
      // ignore network errors on logout
    }
  },
};
