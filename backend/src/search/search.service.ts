import { Injectable } from '@nestjs/common';

export interface SearchProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  stock: number;
  categoryId: number;
  imageUrl: string;
  status: 'active' | 'inactive';
}

export class SearchQueryDto {
  keyword?: string;
  categoryId?: number;
  maxPrice?: number;
}

@Injectable()
export class SearchService {
  private readonly products: SearchProduct[] = [];

  search(params: SearchQueryDto, sourceProducts: SearchProduct[] = this.products): SearchProduct[] {
    const keyword = (params.keyword || '').trim().toLowerCase();
    const categoryId = params.categoryId ? Number(params.categoryId) : undefined;
    const maxPrice = params.maxPrice ? Number(params.maxPrice) : undefined;

    return sourceProducts.filter((product) => {
      if (product.status !== 'active') return false;

      const matchKeyword =
        !keyword ||
        product.name.toLowerCase().includes(keyword) ||
        product.description.toLowerCase().includes(keyword) ||
        product.slug.toLowerCase().includes(keyword);

      const matchCategory = !categoryId || product.categoryId === categoryId;
      const matchPrice = !maxPrice || Number(product.price) <= maxPrice;

      return matchKeyword && matchCategory && matchPrice;
    });
  }
}