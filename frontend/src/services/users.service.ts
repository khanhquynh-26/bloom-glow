
import api from './api';
import type { User } from '../types';

export interface UpdateUserData {
  fullName?: string;
  email?: string;
  phone?: string;
}

const usersService = {
  async getMe(): Promise<User> {
    const response = await api.get<User>('/users/me');
    return response.data;
  },

  async updateMe(data: UpdateUserData): Promise<User> {
    const response = await api.patch<User>('/users/me', data);
    return response.data;
  },

  async getAll(): Promise<User[]> {
    const response = await api.get<User[]>('/users');
    return response.data;
  },

  async getById(id: number): Promise<User> {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },

  async updateRole(
    id: number,
    role: User['role'],
  ): Promise<User> {
    const response = await api.patch<User>(`/users/${id}/role`, {
      role,
    });

    return response.data;
  },
};

export default usersService;
