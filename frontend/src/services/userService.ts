import type { CreateUserPayload, UpdateUserPayload, User } from '../types/auth';
import { http } from './http';

/** Các API quản lý người dùng (chỉ admin) */
export const userService = {
  list: () => http<User[]>('/users'),

  create: (payload: CreateUserPayload) =>
    http<User>('/users', { method: 'POST', body: JSON.stringify(payload) }),

  update: (id: number, payload: UpdateUserPayload) =>
    http<User>(`/users/${id}`, { method: 'PATCH', body: JSON.stringify(payload) }),

  remove: (id: number) => http<{ message: string }>(`/users/${id}`, { method: 'DELETE' }),
};
