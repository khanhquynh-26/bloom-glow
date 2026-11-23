
import { useCallback, useEffect, useState } from 'react';

export function useWishlist() {
  const [wishlist, setWishlist] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('bloom_wishlist');

      return saved ? (JSON.parse(saved) as number[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('bloom_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = useCallback((productId: number) => {
    setWishlist((current) =>
      current.includes(productId)
        ? current
        : [...current, productId]
    );
  }, []);

  const removeFromWishlist = useCallback((productId: number) => {
    setWishlist((current) =>
      current.filter((id) => id !== productId)
    );
  }, []);

  const toggleWishlist = useCallback((productId: number) => {
    setWishlist((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId]
    );
  }, []);

  const isInWishlist = useCallback(
    (productId: number) => wishlist.includes(productId),
    [wishlist]
  );

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist
  };
}
