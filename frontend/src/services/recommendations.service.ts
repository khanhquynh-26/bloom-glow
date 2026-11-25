
import api from './api';
import type { Product } from '../types/product.types';

export const recommendationsService = {
  async getRecommendations(): Promise<Product[]> {
    const response = await api.get('/recommendations');

    const data = response.data;
    return Array.isArray(data) ? data : data.products ?? [];
  },
};
