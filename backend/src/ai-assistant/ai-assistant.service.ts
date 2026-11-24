import { Injectable } from '@nestjs/common';
import { ChatDto } from './dto/chat.dto';

export interface AssistantProduct {
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

export class ChatResponseDto {
  userId?: number;
  reply!: string;
  suggestedProducts!: AssistantProduct[];
  timestamp!: string;
}

@Injectable()
export class AiAssistantService {
  private readonly products: AssistantProduct[] = [];

  reply(dto: ChatDto, sourceProducts: AssistantProduct[] = this.products): ChatResponseDto {
    const text = (dto.message || '').toLowerCase();
    const activeProducts = sourceProducts.filter((p) => p.status === 'active');

    let matched = activeProducts;
    let advice = 'Mình gợi ý vài sản phẩm phù hợp với nhu cầu của bạn.';

    if (
      text.includes('son') ||
      text.includes('mắt') ||
      text.includes('makeup') ||
      text.includes('trang điểm')
    ) {
      matched = activeProducts.filter((p) => p.categoryId === 2);
      advice = 'Với nhu cầu trang điểm, bạn có thể tham khảo các sản phẩm makeup sau.';
    } else if (
      text.includes('da') ||
      text.includes('chống nắng') ||
      text.includes('tẩy trang') ||
      text.includes('skincare') ||
      text.includes('mụn') ||
      text.includes('nhạy cảm') ||
      text.includes('serum') ||
      text.includes('rửa mặt')
    ) {
      matched = activeProducts.filter((p) => p.categoryId === 1);
      advice = 'Với nhu cầu chăm sóc da, bạn có thể tham khảo các sản phẩm skincare sau.';
    } else if (text.includes('quà') || text.includes('gift') || text.includes('tặng')) {
      matched = activeProducts.filter((p) => p.categoryId === 3);
      advice = 'Với nhu cầu quà tặng, bạn có thể tham khảo các set quà sau.';
    }

    const matchK = text.match(/(\d+)\s*k/);
    if (matchK) {
      const budget = Number(matchK[1]) * 1000;
      const underBudget = matched.filter((p) => Number(p.price) <= budget);
      if (underBudget.length > 0) {
        matched = underBudget;
        advice += ` (Lọc theo mức giá từ ${matchK[1]}k trở xuống).`;
      }
    }

    const suggestedProducts = matched.slice(0, 3);

    return {
      userId: dto.userId,
      reply:
        suggestedProducts.length > 0
          ? `${advice} Gợi ý: ${suggestedProducts
              .map((p) => `${p.name} (${Number(p.price).toLocaleString('vi-VN')}đ)`)
              .join(', ')}.`
          : 'Hiện chưa có dữ liệu sản phẩm để gợi ý.',
      suggestedProducts,
      timestamp: new Date().toISOString(),
    };
  }
}