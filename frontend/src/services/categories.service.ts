
import api from './api';

// export interface Category {
//   id: number;
//   name: string;
//   slug: string;
//   description: string;
// }
import type { Category } from '../types';
const categoriesService = {
  async getAll(): Promise<Category[]> {
    const response = await api.get<Category[]>('/categories');
    return response.data;
  },

  async getById(id: number): Promise<Category> {
    const response = await api.get<Category>(`/categories/${id}`);
    return response.data;
  },

  async create(data: Omit<Category, 'id'>): Promise<Category> {
    const response = await api.post<Category>('/categories', data);
    return response.data;
  },

  async update(
    id: number,
    data: Partial<Omit<Category, 'id'>>,
  ): Promise<Category> {
    const response = await api.patch<Category>(`/categories/${id}`, data);
    return response.data;
  },

  async remove(id: number): Promise<void> {
    await api.delete(`/categories/${id}`);
  },
};

export default categoriesService;
