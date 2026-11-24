import { Body, Controller, Post } from '@nestjs/common';
import { AiGiftStudioService, GiftSuggestInputDto, GiftSuggestionDto } from './ai-gift-studio.service';

@Controller('ai-gift-studio')
export class AiGiftStudioController {
  constructor(private readonly aiGiftStudioService: AiGiftStudioService) {}

  @Post('suggest')
  suggest(@Body() dto: GiftSuggestInputDto): GiftSuggestionDto {
    return this.aiGiftStudioService.suggest(dto);
  }
}