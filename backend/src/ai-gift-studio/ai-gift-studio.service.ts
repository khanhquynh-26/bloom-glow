import { Injectable } from '@nestjs/common';

export interface GiftProduct {
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

export class GiftSuggestInputDto {
  budget?: number;
  occasion?: string;
  recipient?: string;
}

export class GiftSuggestionDto {
  occasion!: string;
  recipient!: string;
  budget!: number;
  totalPrice!: string;
  items!: GiftProduct[];
}

@Injectable()
export class AiGiftStudioService {
  private readonly products: GiftProduct[] = [];

  suggest(dto: GiftSuggestInputDto, sourceProducts: GiftProduct[] = this.products): GiftSuggestionDto {
    const budget = Number(dto.budget) || 0;
    const occasion = (dto.occasion || '').trim();
    const recipient = (dto.recipient || '').trim();

    const sorted = [...sourceProducts]
      .filter((p) => p.status === 'active')
      .sort((a, b) => Number(a.price) - Number(b.price));

    const items: GiftProduct[] = [];
    let total = 0;

    for (const product of sorted) {
      const priceNum = Number(product.price);
      if (total + priceNum <= budget) {
        items.push(product);
        total += priceNum;
      }
      if (items.length === 3) break;
    }

    return {
      occasion,
      recipient,
      budget,
      totalPrice: String(total),
      items,
    };
  }
}