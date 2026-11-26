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
    let advice = 'Mình gợi ý vài mẫu hoa tươi, nến thơm và set quà phù hợp với nhu cầu của bạn.';

    if (
      text.includes('set') ||
      text.includes('combo') ||
      text.includes('quà') ||
      text.includes('gift') ||
      text.includes('tặng') ||
      text.includes('hộp quà') ||
      text.includes('sinh nhật') ||
      text.includes('kỷ niệm')
    ) {
      matched = activeProducts.filter((p) => p.categoryId === 3);
      advice = 'Với nhu cầu quà tặng ý nghĩa, bạn có thể tham khảo các set nến và hoa sau.';
    } else if (
      text.includes('nến') ||
      text.includes('thơm') ||
      text.includes('tinh dầu') ||
      text.includes('mùi') ||
      text.includes('hương') ||
      text.includes('thư giãn') ||
      text.includes('chill')
    ) {
      matched = activeProducts.filter((p) => p.categoryId === 2);
      advice = 'Với nhu cầu thư giãn và tạo hương thơm cho không gian, bạn có thể tham khảo các mẫu nến thơm sau.';
    } else if (
      text.includes('hoa') ||
      text.includes('bó hoa') ||
      text.includes('giỏ hoa') ||
      text.includes('lẵng hoa') ||
      text.includes('tươi')
    ) {
      matched = activeProducts.filter((p) => p.categoryId === 1);
      advice = 'Với nhu cầu chọn hoa tươi trao gửi yêu thương, bạn có thể tham khảo các mẫu hoa sau.';
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
          : 'Hiện chưa có dữ liệu sản phẩm hoa tươi hoặc nến thơm để gợi ý.',
      suggestedProducts,
      timestamp: new Date().toISOString(),
    };
  }
}