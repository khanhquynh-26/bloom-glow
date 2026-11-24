
export type UserRole = 'admin' | 'customer';

export interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
}

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  phone: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}
