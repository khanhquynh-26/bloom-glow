
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from 'react';

import type {
  CartItemWithProduct,
  Product,
  CartSummary
} from '../types';

interface CartContextType {
  items: CartItemWithProduct[];
  totalItems: number;
  totalAmount: string;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItemWithProduct[]>(() => {
    try {
      const savedCart = localStorage.getItem('bloom_cart');

      return savedCart
        ? (JSON.parse(savedCart) as CartItemWithProduct[])
        : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('bloom_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = useCallback(
    (product: Product, quantity = 1) => {
      if (quantity <= 0 || product.stock <= 0) return;

      setItems((currentItems) => {
        const existingItem = currentItems.find(
          (item) => item.productId === product.id
        );

        if (existingItem) {
          return currentItems.map((item) =>
            item.productId === product.id
              ? {
                  ...item,
                  quantity: Math.min(
                    item.quantity + quantity,
                    product.stock
                  ),
                  product
                }
              : item
          );
        }

        const newItem: CartItemWithProduct = {
          id: Date.now(),
          cartId: 0,
          productId: product.id,
          quantity: Math.min(quantity, product.stock),
          price: product.price,
          product
        };

        return [...currentItems, newItem];
      });
    },
    []
  );

  const updateQuantity = useCallback(
    (productId: number, quantity: number) => {
      if (quantity <= 0) {
        setItems((currentItems) =>
          currentItems.filter((item) => item.productId !== productId)
        );
        return;
      }

      setItems((currentItems) =>
        currentItems.map((item) => {
          if (item.productId !== productId) return item;

          const maxStock = item.product?.stock ?? quantity;

          return {
            ...item,
            quantity: Math.min(quantity, maxStock)
          };
        })
      );
    },
    []
  );

  const removeFromCart = useCallback((productId: number) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.productId !== productId)
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const summary = useMemo<CartSummary>(() => {
    const totalItems = items.reduce(
      (total, item) => total + item.quantity,
      0
    );

    const totalAmount = items.reduce(
      (total, item) =>
        total + BigInt(item.price) * BigInt(item.quantity),
      0n
    );

    return {
      totalItems,
      totalAmount: totalAmount.toString()
    };
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems: summary.totalItems,
        totalAmount: summary.totalAmount,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
