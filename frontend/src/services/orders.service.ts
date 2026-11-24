
import api from './api';
import type {
  Order,
  OrderItem,
  CreateOrderData,
} from '../types';

export interface OrderDetail extends Order {
  items: OrderItem[];
}

export interface CreateOrderResponse {
  order: Order;
  items: OrderItem[];
}

const ordersService = {
  async getMyOrders(): Promise<Order[]> {
    const response = await api.get<Order[]>('/orders/my-orders');
    return response.data;
  },

  async getById(id: number): Promise<OrderDetail> {
    const response = await api.get<OrderDetail>(`/orders/${id}`);
    return response.data;
  },

  async create(data: CreateOrderData): Promise<CreateOrderResponse> {
    const response = await api.post<CreateOrderResponse>('/orders', data);
    return response.data;
  },

  async cancel(id: number): Promise<Order> {
    const response = await api.patch<Order>(`/orders/${id}/cancel`);
    return response.data;
  },

  async getAll(): Promise<Order[]> {
    const response = await api.get<Order[]>('/orders');
    return response.data;
  },

  async updateStatus(
    id: number,
    status: Order['status'],
  ): Promise<Order> {
    const response = await api.patch<Order>(`/orders/${id}/status`, {
      status,
    });

    return response.data;
  },
};

export default ordersService;
