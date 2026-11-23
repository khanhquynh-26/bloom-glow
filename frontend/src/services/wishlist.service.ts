
import api from './api';
import type { Product } from '../types';

const wishlistService = {
  async getAll(): Promise<Product[]> {
    const response = await api.get<Product[]>('/wishlist');
    return response.data;
  },

  async add(productId: number): Promise<void> {
    await api.post('/wishlist', { productId });
  },

  async remove(productId: number): Promise<void> {
    await api.delete(`/wishlist/${productId}`);
  },

  async clear(): Promise<void> {
    await api.delete('/wishlist');
  },
};

export default wishlistService;
