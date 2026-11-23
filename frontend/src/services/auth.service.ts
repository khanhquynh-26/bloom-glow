
import api from './api';
import type {
  AuthResponse,
  LoginData,
  RegisterData,
  User,
} from '../types';

const authService = {
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  async getProfile(): Promise<User> {
    const response = await api.get<User>('/auth/profile');
    return response.data;
  },

  async forgotPassword(email: string): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>(
      '/auth/forgot-password',
      { email },
    );

    return response.data;
  },
};

export default authService;
