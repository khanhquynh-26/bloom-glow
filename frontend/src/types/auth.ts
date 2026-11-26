// Kiểu dữ liệu khớp với backend (camelCase, id là number, thời gian ISO 8601)
export type UserRole = 'CUSTOMER' | 'ADMIN';
export type UserStatus = 'active' | 'blocked';

export interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string | null;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
}

export interface CreateUserPayload extends RegisterPayload {
  role?: UserRole;
  status?: UserStatus;
}

export type UpdateUserPayload = Partial<Omit<CreateUserPayload, 'phone'>> & {
  phone?: string | null;
};
