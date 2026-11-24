
import api from './api';
import type { Product } from '../types/product.types';

export const searchService = {
  async searchProducts(keyword: string): Promise<Product[]> {
    const response = await api.get('/search', {
      params: { keyword },
    });

    // Hỗ trợ cả response là mảng hoặc object chứa products
    const data = response.data;

    return Array.isArray(data) ? data : data.products ?? [];
  },
};
