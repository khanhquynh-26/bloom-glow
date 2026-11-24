
export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'shipping'
  | 'completed'
  | 'cancelled';

export type PaymentMethod =
  | 'cod'
  | 'bank_transfer';

export interface Order {
  id: number;
  userId: number;
  totalAmount: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  shippingAddress: string;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  unitPrice: string;
}

export interface CreateOrderData {
  paymentMethod: PaymentMethod;
  shippingAddress: string;
}
