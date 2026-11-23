
import type { Product } from './product.types';

export interface Cart {
  id: number;
  userId: number;
  createdAt: string;
}

export interface CartItem {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  price: string;
}

// Dữ liệu bổ sung để hiển thị sản phẩm trong giao diện giỏ hàng.
// Không thay thế cấu trúc CartItem dùng khi trao đổi với Backend.
export interface CartItemWithProduct extends CartItem {
  product?: Product;
}

export interface CartSummary {
  totalItems: number;
  totalAmount: string;
}
