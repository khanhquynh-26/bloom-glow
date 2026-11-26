import type { AuthResponse, LoginPayload, RegisterPayload, User } from '../types/auth';
import { http } from './http';

export const authService = {
  login: (payload: LoginPayload) =>
    http<AuthResponse>('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),

  register: (payload: RegisterPayload) =>
    http<AuthResponse>('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),

  me: () => http<User>('/auth/me'),
};
