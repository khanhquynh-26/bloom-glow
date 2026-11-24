
import api from './api';
import type { Product, ProductQuery } from '../types';

export interface PaginatedProducts {
  data: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const productsService = {
  async getAll(params?: ProductQuery): Promise<PaginatedProducts> {
    const response = await api.get<PaginatedProducts>('/products', {
      params,
    });

    return response.data;
  },

  async getById(id: number): Promise<Product> {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },

  async getBySlug(slug: string): Promise<Product> {
    const response = await api.get<Product>(`/products/slug/${slug}`);
    return response.data;
  },

  async search(keyword: string): Promise<Product[]> {
    const response = await api.get<Product[]>('/products/search', {
      params: { keyword },
    });

    return response.data;
  },

  async getFeatured(): Promise<Product[]> {
    const response = await api.get<Product[]>('/products/featured');
    return response.data;
  },

  async create(data: Partial<Product>): Promise<Product> {
    const response = await api.post<Product>('/products', data);
    return response.data;
  },

  async update(id: number, data: Partial<Product>): Promise<Product> {
    const response = await api.patch<Product>(`/products/${id}`, data);
    return response.data;
  },

  async remove(id: number): Promise<void> {
    await api.delete(`/products/${id}`);
  },
};

export default productsService;
