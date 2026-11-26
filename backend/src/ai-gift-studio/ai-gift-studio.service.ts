// src/ai-gift-studio/ai-gift-studio.service.ts
import { Injectable } from '@nestjs/common';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GiftSuggestInputDto {
  @IsOptional()
  @IsNumber()
  budget?: number;

  @IsOptional()
  @IsString()
  occasion?: string;

  @IsOptional()
  @IsString()
  recipient?: string;
}

export interface GiftSuggestionItem {
  title: string;
  reason: string;
  estimatedPrice?: number;
}

@Injectable()
export class AiGiftStudioService {
  suggest(input: GiftSuggestInputDto) {
    const occasion = input.occasion?.trim() || 'đặc biệt';
    const recipient = input.recipient?.trim() || 'người thân';
    const budget = input.budget ?? 500000;

    const suggestions: GiftSuggestionItem[] = [
      {
        title: 'Bó Hoa Tươi Thiết Kế Theo Tông Màu',
        reason: `Hoa tươi tinh tế, tươi mới, rất hợp để trao gửi lời chúc tới ${recipient} trong dịp ${occasion}.`,
        estimatedPrice: Math.round(budget * 0.8),
      },
      {
        title: 'Nến Thơm Tinh Dầu Thiên Nhiên Thủ Công',
        reason: `Hương thơm dịu nhẹ giúp thư giãn và lưu giữ kỷ niệm cho ${recipient} sau dịp ${occasion}.`,
        estimatedPrice: Math.round(budget * 0.65),
      },
      {
        title: 'Set Quà Nến Thơm & Hoa Tươi Phối Hộp',
        reason: `Combo kết hợp trọn vẹn sắc hoa tươi và hương nến ấm áp, sang trọng dành tặng ${recipient} dịp ${occasion}.`,
        estimatedPrice: budget,
      },
    ];

    return {
      input,
      suggestions,
    };
  }
}