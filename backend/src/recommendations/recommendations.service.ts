import { Injectable } from '@nestjs/common';
import { UserEventsService } from '../user-events/user-events.service';

export interface RecommendProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  stock: number;
  categoryId: number;
  imageUrl: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

@Injectable()
export class RecommendationsService {
  private readonly products: RecommendProduct[] = [];

  constructor(private readonly userEventsService: UserEventsService) {}

  getRelatedProducts(
    productId: number,
    sourceProducts: RecommendProduct[] = this.products,
  ): RecommendProduct[] {
    const target = sourceProducts.find((p) => p.id === Number(productId));
    if (!target) return [];

    const sameCategory = sourceProducts.filter(
      (p) =>
        p.id !== Number(productId) &&
        p.status === 'active' &&
        p.categoryId === target.categoryId,
    );
    const others = sourceProducts.filter(
      (p) =>
        p.id !== Number(productId) &&
        p.status === 'active' &&
        p.categoryId !== target.categoryId,
    );
    return [...sameCategory, ...others].slice(0, 3);
  }

  getPersonalRecommendations(
    userId = 1,
    sourceProducts: RecommendProduct[] = this.products,
  ): RecommendProduct[] {
    const userEvents = this.userEventsService.findByUser(userId);
    const interactedProductIds = new Set(
      userEvents
        .map((e) => e.productId)
        .filter((id): id is number => typeof id === 'number'),
    );

    const preferredCategories = new Set(
      sourceProducts
        .filter((p) => interactedProductIds.has(p.id))
        .map((p) => p.categoryId),
    );

    const matched = sourceProducts.filter(
      (p) => p.status === 'active' && preferredCategories.has(p.categoryId),
    );

    return matched.length > 0
      ? matched
      : sourceProducts.filter((p) => p.status === 'active').slice(0, 4);
  }
}