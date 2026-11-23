
import api from './api';
import type { Cart, CartItem } from '../types';

export interface CartResponse {
  cart: Cart;
  items: CartItem[];
}

const cartService = {
  async getMyCart(): Promise<CartResponse> {
    const response = await api.get<CartResponse>('/carts/me');
    return response.data;
  },

  async addItem(
    productId: number,
    quantity: number,
  ): Promise<CartItem> {
    const response = await api.post<CartItem>('/carts/items', {
      productId,
      quantity,
    });

    return response.data;
  },

  async updateItem(
    productId: number,
    quantity: number,
  ): Promise<CartItem> {
    const response = await api.patch<CartItem>(
      `/carts/items/${productId}`,
      { quantity },
    );

    return response.data;
  },

  async removeItem(productId: number): Promise<void> {
    await api.delete(`/carts/items/${productId}`);
  },

  async clearCart(): Promise<void> {
    await api.delete('/carts/items');
  },
};

export default cartService;
