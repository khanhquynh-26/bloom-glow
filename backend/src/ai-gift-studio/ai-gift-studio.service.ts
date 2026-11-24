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
    const suggestions: GiftSuggestionItem[] = [
      {
        title: 'Set dưỡng da & chăm sóc cá nhân cao cấp',
        reason: `Phù hợp cho dịp ${input.occasion ?? 'đặc biệt'} dành cho ${input.recipient ?? 'người thân'}.`,
        estimatedPrice: input.budget ?? 500000,
      },
    ];

    return {
      input,
      suggestions,
    };
  }
}