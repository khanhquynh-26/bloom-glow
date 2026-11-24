export type ProductStatus = 'active' | 'inactive';

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  stock: number;
  categoryId: number;
  imageUrl: string;
  status: ProductStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ProductQuery {
  keyword?: string;
  categoryId?: number;
  minPrice?: string;
  maxPrice?: string;
  status?: ProductStatus;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}